export const monthFeeTimeGap_days = 30;

const RouteConfig = {
  route1: {
    areas: ["area1", "area2"],
    amountPerMonth: 400,
  },
  route2: {
    areas: ["area3", "area4"],
    amountPerMonth: 500,
  },
  route3: {
    areas: ["area5", "area6"],
    amountPerMonth: 550,
  },
  route4: {
    areas: ["area7", "area8"],
    amountPerMonth: 600,
  },
  route5: {
    areas: ["area9", "area10"],
    amountPerMonth: 650,
  },
  route6: {
    areas: ["area11", "area12"],
    amountPerMonth: 700,
  },
  route7: {
    areas: ["area13", "area14"],
    amountPerMonth: 720,
  },
  route8: {
    areas: ["area15", "area16"],
    amountPerMonth: 740,
  },
  route9: {
    areas: ["area17", "area18"],
    amountPerMonth: 780,
  },
  route10: {
    areas: ["area19", "area20"],
    amountPerMonth: 800,
  },
  route11: {
    areas: ["area21", "area22"],
    amountPerMonth: 810,
  },
  route12: {
    areas: ["area23", "area24"],
    amountPerMonth: 820,
  },
};

export const feeConfig: {
  [key: string]: {
    tution: number;
    computer: number;
    library: number;
    annual: number;
    activity: number;
  };
} = {
  lkg: {
    tution: 1000,
    computer: 800,
    library: 500,
    annual: 300,
    activity: 200,
  },
  ukg: {
    tution: 2000,
    computer: 800,
    library: 500,
    annual: 300,
    activity: 200,
  },
  class1: {
    tution: 3000,
    computer: 800,
    library: 500,
    annual: 300,
    activity: 200,
  },
  class2: {
    tution: 4000,
    computer: 800,
    library: 500,
    annual: 300,
    activity: 200,
  },
};

export const busRouteConfig = {
  bus1: [RouteConfig.route1],
  bus2: [RouteConfig.route2],
  bus3: [RouteConfig.route3],
  bus4: [RouteConfig.route4],
  bus5: [RouteConfig.route5],
  bus6: [RouteConfig.route6],
  bus7: [RouteConfig.route7],
  bus8: [RouteConfig.route8],
  bus9: [RouteConfig.route9],
  bus10: [RouteConfig.route10],
  bus11: [RouteConfig.route11],
  bus12: [RouteConfig.route12],
};
