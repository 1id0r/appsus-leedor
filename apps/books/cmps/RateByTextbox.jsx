export function RateByTextbox(props) {

    return (
        <input {...props} type="number" placeholder="enter 1-5" min='1' max='5'/>
    )
}