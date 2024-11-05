import { Modal } from "../modal";

type Props = {
    tryAgainFn: () => void,
}

export const LevelFailedModal = ({tryAgainFn}: Props) => {
    return (
        <Modal>
            <h1>Level Failed</h1>
            <p>Opps, you've run out of places to place tiles. Click below to try again.</p>
            <button onClick={tryAgainFn}>Try Again</button>
        </Modal>
    );
}