/*// Asynchonous
console.log("Start");
setTimeout(() => {
  console.log("COUCOU");
}, 2000);
console.log("End");*/

///////////////////////////////////////

const countriesContainer = document.querySelector('.countries');
const btn = document.querySelector('.btn-country');

// Our first AJAX call
const renderCountry = (data, className = '') => {
	const currencies = Object.values(data.currencies);
	const languages = Object.values(data.languages);

	const html = `<article class="country ${className}">
      <img class="country__img" src="${data.flags.png}" />
      <div class="country__data">
      <h3 class="country__name">${data.name.common}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
				+data.population / 1_000_000
			).toFixed(2)} million(s) people</p>
      <p class="country__row"><span>🗣️</span>${languages[0]}</p>
      <p class="country__row"><span>💰</span>${currencies[0].name}</p>
          </div>
        </article>`;

	countriesContainer.insertAdjacentHTML('beforeend', html);
	countriesContainer.style.opacity = 1;
};

const getRandomCountryAndNeighbours = () => {
	const request = new XMLHttpRequest();
	request.open('GET', 'https://restcountries.com/v3.1/all');
	request.send();

	request.addEventListener('load', function () {
		const countries = JSON.parse(this.responseText);
		const randomIndex = Math.floor(Math.random() * countries.length);
		const randomCountry = countries[randomIndex];

		// console.log(randomCountry);
		renderCountry(randomCountry);

		const neighbour = randomCountry.borders;

		if (!neighbour) return;

		const request2 = new XMLHttpRequest();
		request2.open(
			'GET',
			`https://restcountries.com/v3.1/alpha?codes=${neighbour}`
		);
		request2.send();

		request2.addEventListener('load', function () {
			const data = JSON.parse(this.responseText);
			// Sort the neighboring countries by name before rendering
			data.sort((a, b) => a.name.common.localeCompare(b.name.common));

			data.forEach((element) => {
				renderCountry(element, 'neighbour');
			});
		});
	});
};

// ...

btn.addEventListener('click', function () {
	getRandomCountryAndNeighbours();
});

// const getCountryDataAndNeighbour = (country) => {
// 	//const getCountryData = (country) => {
// 	const request = new XMLHttpRequest();
// 	request.open('GET', `https://restcountries.com/v3.1/name/${country}`);
// 	request.send();
// 	//console.log(request);
// 	request.addEventListener('load', function () {
// 		const [data] = JSON.parse(this.responseText);
// 		console.log(data);
// 		renderCountry(data);

// 		const neighbour = data.borders;

// 		if (!neighbour) return;

// 		const request2 = new XMLHttpRequest();
// 		request2.open(
// 			'GET',
// 			`https://restcountries.com/v3.1/alpha?codes=${neighbour}`
// 		);
// 		request2.send();
// 		request2.addEventListener('load', function () {
// 			const data = JSON.parse(this.responseText);
// 			data.forEach((element) => {
// 				renderCountry(element, 'neighbour');
// 			});
// 			// Sort tout les pays voisins
// 		});
// 	});
// 	//};
// };

// // getCountryDataAndNeighbour("france");
// //getCountryDataAndNeighbour("japan");

// /*getCountryData("france");
// getCountryData("japan");*/

// /*const requestTest = fetch(`https://restcountries.com/v3.1/name/france`);
// console.log(requestTest);*/

// const renderError = (msg) => {
// 	countriesContainer.insertAdjacentHTML('beforeend', msg);
// 	countriesContainer.style.opacity = 1;
// };

// // const getCountryData = function (country) {
// // 	// Country 1
// // 	getJSON(`https://restcountries.com/v3.1/name/${country}`, 'Country not found')
// // 		.then((data) => {
// // 			renderCountry(data[0]);
// // 			const neighbour = data[0].borders?.[0];

// // 			if (!neighbour) throw new Error('No neighbour found!');
// // 			// Country 2
// // 			return getJSON(
// // 				`https://restcountries.com/v3.1/alpha?codes=${neighbour}`,
// // 				'Country not found'
// // 			);
// // 		})
// // 		.then((data) => {
// // 			// Boucle tout les éléments des pays voisins
// // 			data.forEach((item) => {
// // 				renderCountry(item, 'neighbour');
// // 			});
// // 		})
// // 		.catch((err) => {
// // 			console.log(`${err}`);
// // 			renderError(`Something went wrong ${err.message}. Try again!`);
// // 		});
// // };

// // const getJSON = async (url, errorMsg = 'Something went wrong !') => {
// // 	const res = await fetch(url);
// // 	//console.log(res);
// // 	if (!res.ok) {
// // 		throw new Error(`${errorMsg} (${res.status})`);
// // 	}
// // 	return await res.json();
// // };

// // const whereAmI = () => {
// // 	getPosition
// // 		.then((pos) => {
// // 			const { latitude: lat, longitude: lng } = pos.coords;
// // 			return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
// // 		})
// // 		.then((res) => {
// // 			console.log(res);
// // 			if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
// // 			return res.json();
// // 		})
// // 		.then((data) => {
// // 			console.log(data);
// // 			console.log(`You are in ${data.city}, ${data.country}`);
// // 			return fetch(`https://restcountries.com/v3.1/name/${data.country}`);
// // 		})
// // 		.then((res) => {
// // 			if (!res.ok) throw new Error(`Country not found (${res.status})`);
// // 			return res.json();
// // 		})
// // 		.then((data) => renderCountry(...data))
// // 		.catch((err) => console.error(err.message));
// // };

// btn.addEventListener('click', function () {
// 	getRandomCountryAndNeighbours();
// });
// btn.addEventListener('click', whereAmI);

// getCountryData("france");

// whereAmI(35.689, 139.69);
// whereAmI(52.37, 4.895);
// whereAmI(-33.933, 18.474);
// console.log(whereAmI(35.689, 139.69));

// Event Loop
/*console.log("Test start"); // s'exécute en 1
setTimeout(() => console.log("0 sec timer"), 0); // s'exécute en 5
Promise.resolve("Resolve promise 1").then((res) => console.log(res)); // s'exécute en 3
Promise.resolve("Resolve promise 2").then((res) => {
  for (let i = 0; i < 100000; i++) {}
  console.log(res); // s'exécute en 4
});
console.log("Test end"); // s'exécute en 2
/*
// Building a simple promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log("Lootery draw is happenig");
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve("You WIN");
    } else {
      reject(new Error("You lost your money"));
    }
  }, 2000);
});

lotteryPromise
  .then((res) => console.log(res))
  .catch((err) => console.error(err));

/*const wait = (seconds) => {
  return new Promise((resolve) => {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log("5");
    return wait(1);
  })
  .then(() => {
    console.log("4");
    return wait(1);
  })
  .then(() => {
    console.log("3");
    return wait(1);
  })
  .then(() => {
    console.log("2");
    return wait(1);
  })
  .then(() => {
    console.log("1");
    return wait(1);
  })
  .then(() => console.log("GO !"));
*/
// Manière de build une promise simplement
/*Promise.resolve("abc").then((res) => console.log(res));
Promise.reject(new Error("Problem!")).catch((err) => console.log(err));*/

// Promisifying geolocation API
// const getPosition = new Promise((resolve, reject) => {
// 	//navigator.geolocation.getCurrentPosition(
// 	//(position) => resolve(position),
// 	//(err) => reject(err)
// 	//);
// 	navigator.geolocation.getCurrentPosition(resolve, reject);
// });

//getPosition.then((res) => console.log(res));

// ASYNC / AWAIT
// const whereAmI = async () => {
//   try {
//     // Geolocation
//     const pos = await getPosition;
//     const { latitude: lat, longitude: lng } = pos.coords;

//     // Reverse Geocoding
//     const resGeo = await fetch(`https://geocode.xyz/${lat}, ${lng}?geoit=json`);
//     if (!resGeo.ok) throw new Error("Problem getting location data");
//     const dataGeo = await resGeo.json();
//     //console.log(dataGeo);

//     // Country Data
//     const res = await fetch(
//       `https://restcountries.com/v3.1/name/${dataGeo.country}`
//     );
//     if (!res.ok) throw new Error("Problem getting country");
//     const data = await res.json();
//     //console.log(data);
//     renderCountry(data[0]);

//     return `You are in ${dataGeo.city} in ${dataGeo.country}`;
//   } catch (err) {
//     console.error(`${err}`);
//     renderError(`${err.message}`);

//     //Reject promise returned from asynch function
//     throw err;
//   }
// };

// Returning values from asynch functions
// console.log('1: Will get location');
// (async () => {
// 	try {
// 		const city = await whereAmI();
// 		console.log(`2a: ${city}`);
// 	} catch (err) {
// 		console.error(`2b: ${err.message}`);
// 		renderError(`${err.message}`);
// 	}
// 	console.log('3: Finished getting location');
// })();

/*console.log("1: Will get location");
whereAmI()
  .then((city) => console.log(`2a: ${city}`))
  .catch((err) => console.error(`2b: ${err.message}`))
  .finally(() => console.log("3: Finished getting location"));*/

// Try...catch
/*try {
  let y = 2;
  const x = 3;
  x = 4;
} catch (err) {
  alert(err.message);
}*/

// Running promise in Parallel
// const get3Countries = async (c1, c2, c3) => {
//   try {
//     const data = await Promise.all([
//       // si la premiere promise echoue le reste ne passe pas
//       getJSON(`https://restcountries.com/v3.1/name/${c1}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c2}`),
//       getJSON(`https://restcountries.com/v3.1/name/${c3}`),
//     ]);
//     console.log(data.flatMap((el) => el[0].capital));
//   } catch (err) {
//     console.error(err);
//   }
// };
// get3Countries("tunisia", "vietnam", "gb");
