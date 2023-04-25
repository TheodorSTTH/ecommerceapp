export default function H2(props) {
    return <h1 className={"text-3xl font-semibold " + props.className}>{props.children}</h1>
}