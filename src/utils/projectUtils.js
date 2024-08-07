export const filterProjectsByStatus = (projects, status) => {
    return projects.filter(project => project.status === status);
};

export const sortProjectsByDate = (projects) => {
    return projects.sort((a, b) => new Date(a.startDate) - new Date(b.startDate));
};
