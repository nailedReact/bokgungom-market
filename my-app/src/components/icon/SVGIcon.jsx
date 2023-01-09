export default function SVGIcon({id, width=24, height=24, alt}) {
    return (
        <svg width={width} height={height} aria-labelledby={alt}>
            <use href={`#${id}`} />
        </svg>
    )
}