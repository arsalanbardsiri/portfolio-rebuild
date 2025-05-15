type ProjectItemProps = {
  title: string;
  description: string;
  link: string;
  imageUrl: string;
};

export default function ProjectItem({
  title,
  description,
  link,
  imageUrl,
}: ProjectItemProps) {
  return (
    <li>
    <img
    src={imageUrl}
    alt={title}
    height={200}
    width={200}
    /><br />
    <strong>{title}</strong><br />
    <em>{description}</em><br />
    <a href={link} target="_blank" rel="noopener noreferrer">
    View Project
    </a>
    <hr />
    </li>
    );
}
