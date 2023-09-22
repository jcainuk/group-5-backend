// Function to calculate the distance between two sets of coordinates using the Haversine formula

/*The Haversine formula is a mathematical formula used to calculate the distance between two points on the surface of a sphere, such as the Earth. It's commonly used to calculate the distance between two sets of coordinates (latitude and longitude) on the Earth's surface. */

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in kilometers
  const lat1Rad = (Math.PI * lat1) / 180;
  const lon1Rad = (Math.PI * lon1) / 180;
  const lat2Rad = (Math.PI * lat2) / 180;
  const lon2Rad = (Math.PI * lon2) / 180;

  const dLat = lat2Rad - lat1Rad;
  const dLon = lon2Rad - lon1Rad;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Distance in meters
  const distance = R * c * 1000;

  return distance;
}


function updateUserAchievements(user, medal) {
  switch (medal) {
    case "gold":
      user.achievements.gold += 1;
      break;
      case "silver":
        user.achievements.silver += 1;
      break;
      case "bronze":
        user.achievements.bronze += 1;
      break
  }
}

module.exports = {calculateDistance, updateUserAchievements};
