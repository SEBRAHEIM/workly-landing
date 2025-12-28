export default function CategoryCard({ title, desc, icon }) {
  return (
    <div className="catCard">
      <div className="catIcon">{icon}</div>
      <div className="catTitle">{title}</div>
      <div className="catDesc">{desc}</div>
    </div>
  )
}
