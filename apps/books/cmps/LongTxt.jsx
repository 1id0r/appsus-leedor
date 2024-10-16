const { useState, useEffect } = React

export function LongTxt({ fullTxt, length = 100 }) {

    const [isLong, setIsLong] = useState(true)
    const [txt , setTxt]= useState(fullTxt)

    useEffect(() => {
        setTxt(fullTxt)
        if (!isLong) setTxt(fullTxt.substring(0,length)) 
    }, [isLong])

    function toggleTxtLength() {
        setIsLong(isLong => !isLong)
    }

    return (
        <React.Fragment>
            <p>{txt}</p>
            <button onClick={toggleTxtLength}>
                 {isLong ? <i class="fa-solid fa-square-caret-up"></i> : <i class="fa-solid fa-square-caret-down"></i>}
                </button>
        </React.Fragment>
    )

}