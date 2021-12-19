/**
 * Gets the list of all Apps
 * 
 * @returns {Promise<{
 *  cache_time: number,
 *  data: App[]
 * }>}
 */
export async function getApps() {
  return {
    cache_time: 20,
    data: [
      {
        app_id: "123456",
        app_name: "Panda Draw",
      },
      {
        app_id: "789652",
        app_name: "Number Ninja",
      },
      {
        app_id: "741553",
        app_name: "Word Crush",
      },
      {
        app_id: "986321",
        app_name: "Brain Quiz",
      },
      {
        app_id: "320248",
        app_name: "Age Calculator",
      },
    ],
  };
}


/**
 * retrieves the report of ad analytics
 * 
 * @param {string} startDate YYYY-MM-DD formatted date string
 * @param {string} endDate YYYY-MM-DD formatted date string
 * 
 * @return {Promise<{
 *  cache_time: number,
 *  data: Analytic[]
 * }>}
 */
export async function getReport(startDate, endDate) {
  return {
    cache_time: 20,
    data: [
      {
        date: "2021-05-01T00:00:00Z",
        app_id: "123456",
        requests: 1025778,
        responses: 1025731,
        impressions: 1025459,
        clicks: 1024784,
        revenue: 343.12883942062234,
      },
      {
        date: "2021-05-01T00:00:00Z",
        app_id: "789652",
        requests: 1071522,
        responses: 1071491,
        impressions: 1071475,
        clicks: 1070814,
        revenue: 250.8735259224781,
      },
      {
        date: "2021-05-01T00:00:00Z",
        app_id: "741553",
        requests: 1037105,
        responses: 1037026,
        impressions: 1036696,
        clicks: 1036420,
        revenue: 361.44118829605384,
      },
      {
        date: "2021-05-01T00:00:00Z",
        app_id: "986321",
        requests: 1011014,
        responses: 1010979,
        impressions: 1010803,
        clicks: 1009826,
        revenue: 17.83471535989634,
      },
      {
        date: "2021-05-01T00:00:00Z",
        app_id: "320248",
        requests: 1018624,
        responses: 1018607,
        impressions: 1018416,
        clicks: 1018194,
        revenue: 129.5415593674807,
      },
      {
        date: "2021-05-02T00:00:00Z",
        app_id: "123456",
        requests: 1093681,
        responses: 1093599,
        impressions: 1093229,
        clicks: 1092903,
        revenue: 0.5481877064338262,
      },
      {
        date: "2021-05-02T00:00:00Z",
        app_id: "789652",
        requests: 1076309,
        responses: 1076265,
        impressions: 1075952,
        clicks: 1075422,
        revenue: 247.60367659086276,
      },
      {
        date: "2021-05-02T00:00:00Z",
        app_id: "741553",
        requests: 1090441,
        responses: 1090389,
        impressions: 1090159,
        clicks: 1089441,
        revenue: 144.9459076024531,
      },
      {
        date: "2021-05-02T00:00:00Z",
        app_id: "986321",
        requests: 1058925,
        responses: 1058910,
        impressions: 1058514,
        clicks: 1057642,
        revenue: 14.451989831877288,
      },
      {
        date: "2021-05-02T00:00:00Z",
        app_id: "320248",
        requests: 1005016,
        responses: 1004979,
        impressions: 1004642,
        clicks: 1004573,
        revenue: 9.879388109827623,
      },
      {
        date: "2021-05-03T00:00:00Z",
        app_id: "123456",
        requests: 1007145,
        responses: 1007131,
        impressions: 1007041,
        clicks: 1006824,
        revenue: 382.60513019213306,
      },
      {
        date: "2021-05-03T00:00:00Z",
        app_id: "789652",
        requests: 1028983,
        responses: 1028906,
        impressions: 1028647,
        clicks: 1028538,
        revenue: 34.343774608621565,
      },
      {
        date: "2021-05-03T00:00:00Z",
        app_id: "741553",
        requests: 1016705,
        responses: 1016616,
        impressions: 1016406,
        clicks: 1015854,
        revenue: 247.73548207468224,
      },
      {
        date: "2021-05-03T00:00:00Z",
        app_id: "986321",
        requests: 1066704,
        responses: 1066670,
        impressions: 1066565,
        clicks: 1065987,
        revenue: 262.2155247813088,
      },
      {
        date: "2021-05-03T00:00:00Z",
        app_id: "320248",
        requests: 1082031,
        responses: 1082001,
        impressions: 1081527,
        clicks: 1081235,
        revenue: 98.95357477060327,
      },
    ],
  };
}

/**
 * @typedef App
 * @property {string} app_id
 * @property {string} app_name
 */

 /**
  * @typedef Analytic
  * @property {string} date
  * @property {string} app_id
  * @property {number} requests
  * @property {number} responses
  * @property {number} impressions
  * @property {number} clicks
  * @property {number} revenue
  */