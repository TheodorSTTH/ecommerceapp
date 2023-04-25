export default function H1(props) {
    return <h1 className={"text-5xl font-bold " + props.className}>{props.children}</h1>
}