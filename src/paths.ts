const paths = {
  home() {
    return '/';
  },

  timeTracker: {
    timeTracker() {
      return '/time-tracker';
    },
    showProject(projectId: number) {
      return `/time-tracker/projects/${projectId}`;
    },
    overview() {
      return 'time-tracker/projects/overview';
    }
  },
};

export default paths;