import React, {useEffect, useState} from 'react'
import "./Header.css"

function Header() {
    
    const [handleShow, setHandleShow] = useState(false)

    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                setHandleShow(true)
            } else {
                setHandleShow(false)
            }
        })
        return () => {
            window.removeEventListener("scroll")
        }
    }, [])

    return (
        <div className={`header ${handleShow && "header__balck"}`}>
            <img src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="Netflix" className="header__netflix"/>
            <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix-user" className="header__user" />
        </div>
    )
}

export default Header
