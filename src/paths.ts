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
    },
  },

  dienstPlan: {
    dienstPlan() {
      return '/dienst-plan';
    },
    showPlan(planId: number) {
      return `/dienst-plan/${planId}`;
    },
  },

  wgGame: {
    wgGame() {
      return '/wg';
    },
    showGame(gameId: number) {
      return `/wg/${gameId}`;
    },
    newWG() {
      return '/wg/newWG';
    }
  },
    
};

export default paths;