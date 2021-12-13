// docker-compose --env-file ./.env -f docker-compose.yml -f docker-compose.dev.yml up -d --build
function StringChallenge(str) {
	var re = /[^A-Za-z0-9]/g;
	str = str.toLowerCase().replace(re, "");
	var len = str.length;
	for (var i = 0; i < len / 2; i++) {
		if (str[i] !== str[len - 1 - i]) {
			return false;
		}
	}
	return true;
}

// keep this function call here
console.log(StringChallenge("racecar"));
