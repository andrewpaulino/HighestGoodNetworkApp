export const projectReportViewData = (state) => ({
  wbs: state.wbs,
  projectMembers: state.projectMembers,
  tasks: state.tasks,
  isActive: state.projectReport.project?.isActive,
  projectName: state.projectReport.project?.projectName,
  isLoading: state.projectReport.isLoading
});
