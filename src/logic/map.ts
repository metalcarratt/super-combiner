import { Coords } from "../types";
import { Direction, LevelType } from "./level-types";

export enum TileType {
  Dead = -1,
  Earth = 0,
  Grass = 1,
  Lightning = 2,
  Fire = 3,
  DarkGrass = 4,
  DarkLightning = 5,
  DarkFire = 6,
  Bloom = 9,
}

export enum RiverEssenceType {
  Mud = "mud",
  Water = "water",
  Electric = "electric",
  Fire = "fire",
  Golden = "golden",
  WaterElectric = "waterElectric",
  ElectricFire = "electricFire",
  FireWater = "fireWater",
}

export type MapTileType = {
  tile: TileType;
  level: number;
  riverType?: RiverEssenceType;
};

type TileFinderFn = (tile: MapTileType) => boolean;
type ForEachFn = (coords: Coords, tile: MapTileType) => any;
type MapEachFn = (coords: Coords, tile: MapTileType) => MapTileType;

const t = () => ({ tile: 0, level: 0 });

export class GameMap {
  private map: MapTileType[][];

  constructor(fromMap?: MapTileType[][]) {
    if (fromMap) {
      this.map = fromMap;
    } else {
      this.map = [];
    }
  }

  clone() {
    return new GameMap([...this.map]);
  }

  getTile = (coords: Coords) => this.map[coords.y][coords.x];

  setTile = (coords: Coords, tile: MapTileType) =>
    (this.map[coords.y][coords.x] = tile);

  findTile = (fn: TileFinderFn) => this.map.flat().find((tile) => fn(tile));
  filterTile = (fn: TileFinderFn) => this.map.flat().filter((tile) => fn(tile));

  forEach = (fn: ForEachFn) => {
    this.map.forEach((row, y) => row.forEach((tile, x) => fn({ x, y }, tile)));
  };

  mapEach = (fn: MapEachFn) =>
    this.getMap().map((row, y) => row.map((tile, x) => fn({ x, y }, tile)));

  getMap = () => this.map;

  fromLevel = (lvl: LevelType) => {
    const coords: Coords[] = [];
    for (let y = 0; y < lvl.size; y++) {
      this.map.push([]);
      for (let x = 0; x < lvl.size; x++) {
        this.map[y].push(t());
        if (lvl.blooms?.find((bloom) => bloom.x === x && bloom.y === y)) {
          this.map[y][x].tile = TileType.Bloom;
        } else {
          coords.push({ x, y });
        }
      }
    }

    if (lvl.deadZones) {
      if (typeof lvl.deadZones === "number") {
        for (let i = 0; i < lvl.deadZones; i++) {
          const r = Math.floor(Math.random() * coords.length);
          const rcoord = coords[r];
          this.map[rcoord.y][rcoord.x].tile = -1;
          // console.log('deadzone', rcoord);
          coords.splice(r, 1);
        }
      } else {
        lvl.deadZones.forEach((coord) => {
          this.map[coord.y][coord.x].tile = -1;
        });
      }
    }

    console.log("has river overlays?", lvl.riverOverlays);
    lvl.riverOverlays?.forEach((riverOverlay) => {
      this.map[riverOverlay.coords.y][riverOverlay.coords.x].riverType =
        RiverEssenceType.Mud;
      console.log(
        "river tile",
        this.map[riverOverlay.coords.y][riverOverlay.coords.x]
      );
    });
  };

  inMap = (coords: Coords) => {
    return (
      coords.x >= 0 &&
      coords.y >= 0 &&
      coords.x < this.map[0].length &&
      coords.y < this.map.length
    );
  };

  up = (coords: Coords) => {
    const upCoords = { y: coords.y - 1, x: coords.x };
    return this.inMap(upCoords) ? upCoords : undefined;
  };

  down = (coords: Coords) => {
    const downCoords = { y: coords.y + 1, x: coords.x };
    return this.inMap(downCoords) ? downCoords : undefined;
  };

  left = (coords: Coords) => {
    const leftCoords = { y: coords.y, x: coords.x - 1 };
    return this.inMap(leftCoords) ? leftCoords : undefined;
  };

  right = (coords: Coords) => {
    const rightCoords = { y: coords.y, x: coords.x + 1 };
    return this.inMap(rightCoords) ? rightCoords : undefined;
  };

  go = (direction: Direction, coord: Coords) => {
    switch (direction) {
      case Direction.Up:
        return this.up(coord);
      case Direction.Down:
        return this.down(coord);
      case Direction.Left:
        return this.left(coord);
      case Direction.Right:
        return this.right(coord);
    }
  };

  adjacentCoords = (coords: Coords) =>
    [
      this.up(coords),
      this.down(coords),
      this.left(coords),
      this.right(coords),
    ].filter((coord) => coord && this.inMap(coord));

  upLeft = (coords: Coords) => {
    const _coords = { y: coords.y - 1, x: coords.x - 1 };
    return this.inMap(_coords) ? _coords : undefined;
  };

  upRight = (coords: Coords) => {
    const _coords = { y: coords.y - 1, x: coords.x + 1 };
    return this.inMap(_coords) ? _coords : undefined;
  };

  downLeft = (coords: Coords) => {
    const _coords = { y: coords.y + 1, x: coords.x - 1 };
    return this.inMap(_coords) ? _coords : undefined;
  };

  downRight = (coords: Coords) => {
    const _coords = { y: coords.y + 1, x: coords.x + 1 };
    return this.inMap(_coords) ? _coords : undefined;
  };

  diagonalCoords = (coords: Coords) =>
    [
      this.upLeft(coords),
      this.upRight(coords),
      this.downLeft(coords),
      this.downRight(coords),
    ].filter((coord) => coord && this.inMap(coord));

  surroundingCoords = (coords: Coords) => [
    ...this.adjacentCoords(coords),
    ...this.diagonalCoords(coords),
  ];
}
