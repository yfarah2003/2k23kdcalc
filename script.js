// Check if a profile exists in localStorage and load it
function loadProfile() {
  var profile = localStorage.getItem('profile');
  if (profile) {
    profile = JSON.parse(profile);
    document.getElementById('currentKd').value = profile.currentKd;
    document.getElementById('kills').value = profile.kills;
    document.getElementById('deaths').value = profile.deaths;
    document.getElementById('desiredKd').value = profile.desiredKd;
    document.getElementById('averageKd').value = profile.averageKd;
  }
}

// Save the profile to localStorage
function saveProfile() {
  var currentKd = parseFloat(document.getElementById('currentKd').value);
  var kills = parseInt(document.getElementById('kills').value);
  var deaths = parseInt(document.getElementById('deaths').value);
  var desiredKd = parseFloat(document.getElementById('desiredKd').value);
  var averageKd = parseFloat(document.getElementById('averageKd').value);

  var profile = {
    currentKd: currentKd,
    kills: kills,
    deaths: deaths,
    desiredKd: desiredKd,
    averageKd: averageKd
  };

  localStorage.setItem('profile', JSON.stringify(profile));
}

// Load the profile on page load
window.addEventListener('load', function() {
  loadProfile();
});

// Save the profile when the form is submitted
document.getElementById('kdForm').addEventListener('submit', function(event) {
  event.preventDefault();
  saveProfile();

  // Calculate required matches and display the result
  var currentKd = parseFloat(document.getElementById('currentKd').value);
  var kills = parseInt(document.getElementById('kills').value);
  var deaths = parseInt(document.getElementById('deaths').value);
  var desiredKd = parseFloat(document.getElementById('desiredKd').value);
  var averageKd = parseFloat(document.getElementById('averageKd').value);

  var currentMatches = (kills + deaths) / averageKd;
  var requiredMatches = Math.ceil(((kills + deaths) + (averageKd * currentMatches * (currentKd - desiredKd))) / (averageKd * desiredKd));

  document.getElementById('result').innerText = 'You need to play approximately ' + requiredMatches + ' matches with an average KD of ' + averageKd + ' to reach the desired KD.';
});
