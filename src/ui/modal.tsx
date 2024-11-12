import './modal.css';

export const Modal = ({children}: React.PropsWithChildren) => {
    return (
        <div className="matte">
            <div className="modal">
                {children}
            </div>
        </div>
    )
}