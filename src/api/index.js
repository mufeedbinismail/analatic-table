/**
 * Gets the list of all Apps
 * 
 * @returns {Promise<{
 *  cache_time: number,
 *  data: App[]
 * }>}
 */
export async function getApps() {
  const response = await fetch('http://go-dev.greedygame.com/v3/dummy/apps');
  return await response.json();
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
  const response = await fetch(`http://go-dev.greedygame.com/v3/dummy/report?startDate=${startDate}&endDate=${endDate}`);
  return await response.json();;
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