import { Modal } from "../modal";

type Props = {
    close: () => void,
}

const Detail = ({tile, children}: React.PropsWithChildren<{tile: string}>) => {
    return (
        <p className="details">
            <div className={`tile ${tile}`} />
            <span className="desc">
                {children}
            </span>
        </p>
    );
}

export const HowToPlayModal = ({close}: Props) => {
    return (
        <Modal>
            <h1>How to play</h1>
            <h2>Aim</h2>
            <p>Place tiles on the board to get points.</p>
            <p>Achieve the goal to win.</p>
            <p>If there are multiple cards at the bottom, choose which one to play.</p>

            <h2>Scoring points</h2>
            <Detail tile="earth">
                <h3>Cracked Earth</h3>
                <ul>
                    <li>No points</li>
                </ul>
            </Detail>
            <Detail tile="grass">
                <h3>Grass</h3>
                <ul>
                    <li>One point for self</li>
                    <li>Plus one point for each horizontally or vertically adjacent grass</li>
                </ul>
            </Detail>
            <Detail tile="lightning">
                <h3>Lightning</h3>
                <ul>
                    <li>One point for self</li>
                    <li>Plus one point for each diagonally adjacent lightning</li>
                    <li>Minus one point for each horizontally or vertically adjacent grass</li>
                </ul>
            </Detail>
            <Detail tile="fire">
                <h3>Fire</h3>
                <ul>
                    <li>One point for self</li>
                    <li>Plus one point for every other fire on the map</li>
                    <li>Minus one point for every adjacent fire</li>
                </ul>
            </Detail>
            <Detail tile="dead">
                <h3>Void</h3>
                <ul>
                    <li>Cannot place tiles here</li>
                </ul>
            </Detail>
            <Detail tile="bloom">
                <h3>Bloom</h3>
                <ul>
                    <li>No points for self</li>
                    <li>Points of all adjacent tiles added together</li>
                    <li>Required for goal "bloom score"</li>
                </ul>
            </Detail>

            <h2>Winning</h2>
            <p>If goal is "score", count points of all tiles added together.</p>
            <p>If goal is "bloom score", count points of all bloom tiles added together.</p>

            <button onClick={close}>Close</button>
        </Modal>
    );
}