const paths = {
  home() {
    return '/';
  },

  workManager: {
    showProjects() {
      return '/work-manager';
    },
    showProject(projectId: number) {
      return `/work-manager/projects/${projectId}`;
    },
    overview() {
      return 'work-manager/projects/overview';
    },
    costManager() {
      return 'work-manager/cost-manager';
    }
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
    wg() {
      return '/wg';
    },
    showGame(gameId: number) {
      return `/wg/${gameId}`;
    },
    newWG() {
      return '/wg/newWG';
    },
    showWG(wgId: number) {
      return `/wg/${wgId}`;
    }
  },
    
};

export default paths;