import './evidence.css'

const screens = [
  { file: 'layout-detail', title: 'A map of the shelves', description: 'A section of the desktop floor plan shows how individual racks sit within an aisle. It gives the operations team a common reference when a physical layout changes.', alt: 'Detail from the store layout interface showing rows of shelf locations' },
  { file: 'rack-editor', title: 'Changing a rack', description: 'The rack editor lets teams add a rack, rotate an existing one or change the sequence of its locations. Those edits keep the digital layout in step with the physical store.', alt: 'Store restructuring menu with controls for adding and updating racks and sequencing locations' },
  { file: 'heatmap-menu', title: 'Reading the floor', description: 'Four views let the team examine storage utilisation, picking time per item, fast-selling items and the centre of each category. A single layout can answer different operating questions.', alt: 'Heatmap selector for location utilisation, picking time per item, fast-selling SKUs and category centroid' },
]

export default function BlinkitStudy() {
  return <section className="store-study wrap" aria-labelledby="store-study-title">
    <p className="eyebrow">Blinkit · Product, strategy & operations</p>
    <h2 className="display-sm" id="store-study-title">When a shelf changes address<span className="o">.</span></h2>
    <div className="migration-study">
      <figure className="migration-device">
        <video src="/work/evidence/location-migration.mp4" poster="/work/evidence/location-migration.webp"
          aria-label="Silent Figma prototype showing aisle and rack selection, scanning and migration confirmation" aria-describedby="migration-description"
          controls playsInline preload="none" />
        <figcaption>Location migration · Figma prototype excerpt</figcaption>
      </figure>
      <div className="migration-copy">
        <h3>From floor plan to bin label</h3>
        <p>Visiting more than 50 stores made one requirement clear. When stock moved to a new shelf, the person doing the work needed a reliable way to update its address. I wrote the product requirements and worked with engineering and operations on a common location system for 2,300+ stores.</p>
        <p id="migration-description">The mobile prototype follows an auditor through one move. They select an aisle and rack, scan the old location and the new label, then compare the floor, aisle, rack, shelf and bin before confirming. The final screen confirms that the migration is complete.</p>
        <p>The desktop tools below show the other side of the workflow. Store teams can change the rack map and use it to investigate where picking slows down.</p>
      </div>
    </div>
    <div className="store-screens">{screens.map(s => <figure key={s.file}>
      <a className="source-print" href={'/work/evidence/' + s.file + '.webp'} target="_blank" rel="noreferrer" aria-label={'Enlarge ' + s.title}><img loading="lazy" src={'/work/evidence/' + s.file + '.webp'} alt={s.alt} /></a>
      <figcaption><h3>{s.title}</h3><p>{s.description}</p></figcaption>
    </figure>)}</div>
  </section>
}
