const paths = {
  home() {
    return '/';
  },

  anja: {
    anja() {
      return '/anja';
    }
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

  typeSpeed: {
    typeSpeed() {
      return '/type-speed';
    }
  },

  workAndTravel: {
    workAndTravel() {
      return `/work+travel`;
    },
    showVanSpot(spotId: number) {
      return `/work+travel/van-spot/${spotId}`;
    }
  },
  dienstPlan: {
    dienstPlan() {
      return '/dienst-plan';
    },
    showDienstPlan(dienstPlanId: number) {
      return `/dienst-plan/${dienstPlanId}`;
    }
  }
};

export default paths;