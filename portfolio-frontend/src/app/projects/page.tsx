'use client';
import { useState, useEffect } from 'react';
import ProjectItem from './ProjectItem';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 2;

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(`http://localhost:1337/api/projects?pagination[page]=${currentPage}&pagination[pageSize]=${itemsPerPage}&populate=image`);
        const json = await res.json();

        setProjects(json.data);

        const total = json.meta.pagination.total;
        const pageSize = json.meta.pagination.pageSize;
        setTotalPages(Math.ceil(total / pageSize));
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    }

    fetchProjects();
  }, [currentPage]);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map((project: any) => (
          <ProjectItem
            key={project.id}
            title={project.title}
            description={project.description?.[0]?.children?.[0]?.text}
            imageUrl={`http://localhost:1337${project.image?.data?.url}`}
            link={project.github_url || "#"}
          />
        ))}
      </ul>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1}>
          ⬅ Previous
        </button>
        <span style={{ margin: '0 10px' }}>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages}>
          Next ➡
        </button>
      </div>
    </div>
  );
}