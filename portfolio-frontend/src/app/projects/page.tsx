async function ProjectsPage() {
  const page = 1;
  const pageSize = 2;
  const data = fetch(`http://localhost:1337/api/projects?populate=image&pagination[page]=${page}&pagination[pageSize]=${pageSize}`, {
  method: 'GET',
  next: { revalidate: 0 },
  });
  const res = await data;
  const json = await res.json();
  const projects = json.data;
  console.log(json);

   return (
    <div>
        <h1>Projects</h1>
        <ul>
            {projects.map((project:any) => ( 
            <li key={project.id}>
                {/* <p>{JSON.stringify(project)}</p> */}
                <strong>{project.title}</strong><br />
                <em>{JSON.stringify(project.description)}</em> <br />
                <em>{project.description?.[0]?.children?.[0].text}</em><br /><br />
                <img src={`http://localhost:1337${project.image?.url}`} alt={project.title} width={250} height={"auto"}/> <br />
            </li>))}
        </ul>
    </div>
  );

}
export default ProjectsPage;