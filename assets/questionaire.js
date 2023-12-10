document.addEventListener('DOMContentLoaded', function () {
  const POST_URL =
    'https://script.google.com/macros/s/AKfycbxCG5BjQoTPsz_8R8p6HIrwrkyHbJyY6vLjRrdaIaqyjFz_W7iMIn8sdnivhxWqVL1fsQ/exec';
  const slideCount = window.ur_questionaire_slide_count;

  const dogData = {};
  dogData.notices = [];

  const nextBtn = document.querySelector('.qur-next');
  const prevBtn = document.querySelector('.qur-prev');
  const progressBar = document.querySelector('#questionaire-progress');

  nextBtn.addEventListener('click', tryNext);
  prevBtn.addEventListener('click', back);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
      // 'Enter' key was pressed
      event.preventDefault();
      tryNext();
    }

    if (event.target.classList.contains('ur-breed-input')) {
      searchBreed(event.target.value);
    }
  });

  document.addEventListener('click', function (event) {
    if (event.target.classList.contains('ur-breed-input')) {
      searchBreed('');
      return;
    }

    if (event.target.classList.contains('ur-breed-result')) {
      const input = document.querySelector('.ur-breed-input');
      input.value = event.target.innerHTML;
      tryNext();
    }
    const breedDropdown = document.querySelector('.ur-dropdown');
    breedDropdown.classList.add('xhidden');

    if (event.target.classList.contains('gender-male')) {
      event.preventDefault();
      dogData.gender = 'male';
      tryNext();
    }

    if (event.target.classList.contains('gender-female')) {
      event.preventDefault();
      dogData.gender = 'female';
      tryNext();
    }

    if (event.target.classList.contains('yes-button')) {
      const btn = event.target.closest('#yes-button');
      const dataKey = btn.getAttribute('data-key');
      dogData[dataKey] = 'yes';

      if (dataKey === 'health_problems') {
        dogData.notices.push(window.ur_health_problems_notice);
      }
      tryNext();
    }
    if (event.target.classList.contains('no-button')) {
      const btn = event.target.closest('#no-button');
      const dataKey = btn.getAttribute('data-key');
      dogData[dataKey] = 'no';
      tryNext();
    }

    if (
      event.target.classList.contains('card-btn') ||
      event.target.closest('button').classList.contains('card-btn')
    ) {
      event.preventDefault();
      const dataKey = event.target
        .closest('.cards-question')
        .getAttribute('data-key');
      const btn = event.target.closest('button');
      const value = btn.getAttribute('data-value');
      dogData[dataKey] = value;
      tryNext();
    }
  });

  function tryNext() {
    // Find the current active slide
    const currentActiveSlide = document.querySelector('[data-active="true"]');
    if (validate(currentActiveSlide)) next(currentActiveSlide);
  }

  function validate(currentSlide) {
    // Find all form elements inside the given slide
    const forms = currentSlide.querySelectorAll('form');
    const dataType = currentSlide.getAttribute('data-type');

    // Loop through each form to validate
    for (let form of forms) {
      // If the form is invalid
      if (!form.checkValidity()) {
        // Display native error messages
        form.reportValidity();
        return false;
      }
    }

    switch (dataType) {
      case 'name-question':
        const nameValue = currentSlide.querySelector('input').value;
        const slides = document.querySelectorAll('.questionaire-slide');
        slides.forEach((slide) => {
          slide.innerHTML = slide.innerHTML.replace(/%\{name\}/g, nameValue);
        });
        dogData.name = nameValue;
        break;
      case 'email-question':
        const emailValue = currentSlide.querySelector('input').value;
        dogData.email = emailValue;
        break;
      case 'age-question':
        const month = currentSlide.querySelector('#month-select').value;
        const ageValue = currentSlide.querySelector('input').value;

        const puppyUntil = window.ur_puppy_until;
        const seniorFrom = window.ur_senior_from;

        dogData.birth = month + '-' + ageValue;

        function stringToDate(str) {
          const [month, year] = str.split('-');
          return new Date(year, month - 1); // JavaScript months are 0-based
        }

        function monthsBetweenDates(startDate, endDate) {
          let months;
          months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
          months -= startDate.getMonth();
          months += endDate.getMonth();
          return months <= 0 ? 0 : months;
        }

        const inputDate = stringToDate(dogData.birth);
        const currentDate = new Date();

        const monthsBetween = monthsBetweenDates(inputDate, currentDate);

        console.log(monthsBetween);
        console.log(puppyUntil);
        console.log(seniorFrom);

        if (monthsBetween < puppyUntil) {
          dogData.notices.push(window.ur_puppy_note);
          dogData.ageCat = 'puppy';
        }
        if (monthsBetween > seniorFrom) {
          dogData.notices.push(window.ur_senior_note);
          dogData.ageCat = 'senior';
        }

        break;
      case 'breed-question':
        const breedValue = currentSlide.querySelector('input').value;
        dogData.breed = breedValue;
        break;
      case 'weight-question':
        const weightValue = currentSlide.querySelector('input').value;
        dogData.weight = weightValue;
        break;
      case 'allergies-question':
        const checkboxes = currentSlide.querySelectorAll(
          'input[type="checkbox"]',
        );
        const checkedArray = Array.from(checkboxes)
          .filter((checkbox) => checkbox.checked)
          .flatMap((checkbox) => checkbox.name.split(', '));

        dogData.allergies = checkedArray;
        break;
    }

    console.log(dogData);

    // Return whether the slide (all forms in it) is valid or not
    return true;
  }

  function next(currentActiveSlide) {
    // If an active slide is found, proceed
    if (currentActiveSlide) {
      // Set its active status to false and hide it
      currentActiveSlide.setAttribute('data-active', 'false');

      const currentSlideIndex = parseInt(
        currentActiveSlide.getAttribute('data-slide'),
      );
      const nextSlideIndex = currentSlideIndex + 1;
      const nextSlide = document.querySelector(
        `[data-slide="${nextSlideIndex}"]`,
      );

      prevBtn.classList.remove('!xhidden');
      console.log(nextSlide);
      // If there's a next slide, set it to active and show it
      if (nextSlide) {
        nextSlide.setAttribute('data-active', 'true');
        nextSlide.classList.remove('xhidden');
      } else {
        // We're at the last slide
        // Calculate the recommendation
        document
          .querySelector('#questionnaire-header')
          .classList.add('xhidden');
        document
          .querySelector('#questionnaire-footer')
          .classList.add('xhidden');
        document
          .querySelector('#questionnaire-spinner')
          .classList.remove('xhidden');
        calculateRecommendation();
      }

      setTimeout(() => {
        currentActiveSlide.classList.add('xhidden');
      }, 250);

      setProgress(currentSlideIndex);
    }
  }

  function back() {
    const currentActiveSlide = document.querySelector('[data-active="true"]');
    // If an active slide is found, proceed
    if (currentActiveSlide) {
      // Set its active status to false and hide it
      currentActiveSlide.setAttribute('data-active', 'false');

      const currentSlideIndex = parseInt(
        currentActiveSlide.getAttribute('data-slide'),
      );
      const prevSlideIndex = currentSlideIndex - 1;
      const prevSlide = document.querySelector(
        `[data-slide="${prevSlideIndex}"]`,
      );

      // If there's a previous slide, set it to active and show it
      if (prevSlide) {
        prevSlide.setAttribute('data-active', 'true');
        prevSlide.classList.remove('xhidden');
      }

      // If we're at the first slide after moving back, hide the 'back' button
      if (prevSlideIndex === 1) {
        prevBtn.classList.add('!xhidden');
      }

      setTimeout(() => {
        currentActiveSlide.classList.add('xhidden');
      }, 700);

      setProgress(prevSlideIndex);
    }
  }

  function setProgress(currentSlideIndex) {
    const perc = (currentSlideIndex / slideCount) * 100;
    console.log(perc);
    var from = parseInt(progressBar.style.getPropertyValue('--value'));
    var duration = 500; // 500ms

    var start = new Date().getTime();

    var timer = setInterval(function () {
      var time = new Date().getTime() - start;
      var x = Math.floor(easeInOutQuart(time, from, perc - from, duration));
      progressBar.style.setProperty('--value', x);
      if (time >= duration) clearInterval(timer);
    }, 1000 / 60);
  }

  function easeInOutQuart(t, b, c, d) {
    if ((t /= d / 2) < 1) return (c / 2) * t * t * t * t + b;
    return (-c / 2) * ((t -= 2) * t * t * t - 2) + b;
  }
  const breeds = [
    {
      id: 1,
      name: 'Affenpinscher',
    },
    {
      id: 2,
      name: 'Afghan Hound',
    },
    {
      id: 3,
      name: 'African Hunting Dog',
    },
    {
      id: 4,
      name: 'Airedale Terrier',
    },
    {
      id: 5,
      name: 'Akbash Dog',
    },
    {
      id: 6,
      name: 'Akita',
    },
    {
      id: 7,
      name: 'Alapaha Blue Blood Bulldog',
    },
    {
      id: 8,
      name: 'Alaskan Husky',
    },
    {
      id: 9,
      name: 'Alaskan Malamute',
    },
    {
      id: 10,
      name: 'American Bulldog',
    },
    {
      id: 11,
      name: 'American Bully',
    },
    {
      id: 12,
      name: 'American Eskimo Dog',
    },
    {
      id: 13,
      name: 'American Eskimo Dog (Miniature)',
    },
    {
      id: 14,
      name: 'American Foxhound',
    },
    {
      id: 15,
      name: 'American Pit Bull Terrier',
    },
    {
      id: 16,
      name: 'American Staffordshire Terrier',
    },
    {
      id: 17,
      name: 'American Water Spaniel',
    },
    {
      id: 18,
      name: 'Anatolian Shepherd Dog',
    },
    {
      id: 19,
      name: 'Appenzeller Sennenhund',
    },
    {
      id: 21,
      name: 'Australian Cattle Dog',
    },
    {
      id: 22,
      name: 'Australian Kelpie',
    },
    {
      id: 23,
      name: 'Australian Shepherd',
    },
    {
      id: 24,
      name: 'Australian Terrier',
    },
    {
      id: 25,
      name: 'Azawakh',
    },
    {
      id: 26,
      name: 'Barbet',
    },
    {
      id: 28,
      name: 'Basenji',
    },
    {
      id: 29,
      name: 'Basset Bleu de Gascogne',
    },
    {
      id: 30,
      name: 'Basset Hound',
    },
    {
      id: 31,
      name: 'Beagle',
    },
    {
      id: 32,
      name: 'Bearded Collie',
    },
    {
      id: 33,
      name: 'Beauceron',
    },
    {
      id: 34,
      name: 'Bedlington Terrier',
    },
    {
      id: 36,
      name: 'Belgian Malinois',
    },
    {
      id: 38,
      name: 'Belgian Tervuren',
    },
    {
      id: 41,
      name: 'Bernese Mountain Dog',
    },
    {
      id: 42,
      name: 'Bichon Frise',
    },
    {
      id: 43,
      name: 'Black and Tan Coonhound',
    },
    {
      id: 45,
      name: 'Bloodhound',
    },
    {
      id: 47,
      name: 'Bluetick Coonhound',
    },
    {
      id: 48,
      name: 'Boerboel',
    },
    {
      id: 50,
      name: 'Border Collie',
    },
    {
      id: 51,
      name: 'Border Terrier',
    },
    {
      id: 53,
      name: 'Boston Terrier',
    },
    {
      id: 54,
      name: 'Bouvier des Flandres',
    },
    {
      id: 55,
      name: 'Boxer',
    },
    {
      id: 56,
      name: 'Boykin Spaniel',
    },
    {
      id: 57,
      name: 'Bracco Italiano',
    },
    {
      id: 58,
      name: 'Briard',
    },
    {
      id: 59,
      name: 'Brittany',
    },
    {
      id: 61,
      name: 'Bull Terrier',
    },
    {
      id: 62,
      name: 'Bull Terrier (Miniature)',
    },
    {
      id: 64,
      name: 'Bullmastiff',
    },
    {
      id: 65,
      name: 'Cairn Terrier',
    },
    {
      id: 67,
      name: 'Cane Corso',
    },
    {
      id: 68,
      name: 'Cardigan Welsh Corgi',
    },
    {
      id: 69,
      name: 'Catahoula Leopard Dog',
    },
    {
      id: 70,
      name: 'Caucasian Shepherd (Ovcharka)',
    },
    {
      id: 71,
      name: 'Cavalier King Charles Spaniel',
    },
    {
      id: 76,
      name: 'Chesapeake Bay Retriever',
    },
    {
      id: 78,
      name: 'Chinese Crested',
    },
    {
      id: 79,
      name: 'Chinese Shar-Pei',
    },
    {
      id: 80,
      name: 'Chinook',
    },
    {
      id: 81,
      name: 'Chow Chow',
    },
    {
      id: 84,
      name: 'Clumber Spaniel',
    },
    {
      id: 86,
      name: 'Cocker Spaniel',
    },
    {
      id: 87,
      name: 'Cocker Spaniel (American)',
    },
    {
      id: 89,
      name: 'Coton de Tulear',
    },
    {
      id: 92,
      name: 'Dalmatian',
    },
    {
      id: 94,
      name: 'Doberman Pinscher',
    },
    {
      id: 95,
      name: 'Dogo Argentino',
    },
    {
      id: 98,
      name: 'Dutch Shepherd',
    },
    {
      id: 101,
      name: 'English Setter',
    },
    {
      id: 102,
      name: 'English Shepherd',
    },
    {
      id: 103,
      name: 'English Springer Spaniel',
    },
    {
      id: 104,
      name: 'English Toy Spaniel',
    },
    {
      id: 105,
      name: 'English Toy Terrier',
    },
    {
      id: 107,
      name: 'Eurasier',
    },
    {
      id: 108,
      name: 'Field Spaniel',
    },
    {
      id: 110,
      name: 'Finnish Lapphund',
    },
    {
      id: 111,
      name: 'Finnish Spitz',
    },
    {
      id: 113,
      name: 'French Bulldog',
    },
    {
      id: 114,
      name: 'German Pinscher',
    },
    {
      id: 115,
      name: 'German Shepherd Dog',
    },
    {
      id: 116,
      name: 'German Shorthaired Pointer',
    },
    {
      id: 119,
      name: 'Giant Schnauzer',
    },
    {
      id: 120,
      name: 'Glen of Imaal Terrier',
    },
    {
      id: 121,
      name: 'Golden Retriever',
    },
    {
      id: 123,
      name: 'Gordon Setter',
    },
    {
      id: 124,
      name: 'Great Dane',
    },
    {
      id: 125,
      name: 'Great Pyrenees',
    },
    {
      id: 127,
      name: 'Greyhound',
    },
    {
      id: 128,
      name: 'Griffon Bruxellois',
    },
    {
      id: 129,
      name: 'Harrier',
    },
    {
      id: 130,
      name: 'Havanese',
    },
    {
      id: 134,
      name: 'Irish Setter',
    },
    {
      id: 135,
      name: 'Irish Terrier',
    },
    {
      id: 137,
      name: 'Irish Wolfhound',
    },
    {
      id: 138,
      name: 'Italian Greyhound',
    },
    {
      id: 140,
      name: 'Japanese Chin',
    },
    {
      id: 141,
      name: 'Japanese Spitz',
    },
    {
      id: 142,
      name: 'Keeshond',
    },
    {
      id: 144,
      name: 'Komondor',
    },
    {
      id: 145,
      name: 'Kooikerhondje',
    },
    {
      id: 147,
      name: 'Kuvasz',
    },
    {
      id: 149,
      name: 'Labrador Retriever',
    },
    {
      id: 151,
      name: 'Lagotto Romagnolo',
    },
    {
      id: 153,
      name: 'Lancashire Heeler',
    },
    {
      id: 155,
      name: 'Leonberger',
    },
    {
      id: 156,
      name: 'Lhasa Apso',
    },
    {
      id: 161,
      name: 'Maltese',
    },
    {
      id: 165,
      name: 'Miniature American Shepherd',
    },
    {
      id: 167,
      name: 'Miniature Pinscher',
    },
    {
      id: 168,
      name: 'Miniature Schnauzer',
    },
    {
      id: 171,
      name: 'Newfoundland',
    },
    {
      id: 172,
      name: 'Norfolk Terrier',
    },
    {
      id: 176,
      name: 'Norwich Terrier',
    },
    {
      id: 177,
      name: 'Nova Scotia Duck Tolling Retriever',
    },
    {
      id: 178,
      name: 'Old English Sheepdog',
    },
    {
      id: 179,
      name: 'Olde English Bulldogge',
    },
    {
      id: 181,
      name: 'Papillon',
    },
    {
      id: 183,
      name: 'Pekingese',
    },
    {
      id: 184,
      name: 'Pembroke Welsh Corgi',
    },
    {
      id: 185,
      name: 'Perro de Presa Canario',
    },
    {
      id: 188,
      name: 'Pharaoh Hound',
    },
    {
      id: 189,
      name: 'Plott',
    },
    {
      id: 193,
      name: 'Pomeranian',
    },
    {
      id: 196,
      name: 'Poodle (Miniature)',
    },
    {
      id: 197,
      name: 'Poodle (Toy)',
    },
    {
      id: 201,
      name: 'Pug',
    },
    {
      id: 204,
      name: 'Puli',
    },
    {
      id: 205,
      name: 'Pumi',
    },
    {
      id: 207,
      name: 'Rat Terrier',
    },
    {
      id: 208,
      name: 'Redbone Coonhound',
    },
    {
      id: 209,
      name: 'Rhodesian Ridgeback',
    },
    {
      id: 210,
      name: 'Rottweiler',
    },
    {
      id: 211,
      name: 'Russian Toy',
    },
    {
      id: 212,
      name: 'Saint Bernard',
    },
    {
      id: 213,
      name: 'Saluki',
    },
    {
      id: 214,
      name: 'Samoyed',
    },
    {
      id: 216,
      name: 'Schipperke',
    },
    {
      id: 218,
      name: 'Scottish Deerhound',
    },
    {
      id: 219,
      name: 'Scottish Terrier',
    },
    {
      id: 221,
      name: 'Shetland Sheepdog',
    },
    {
      id: 222,
      name: 'Shiba Inu',
    },
    {
      id: 223,
      name: 'Shih Tzu',
    },
    {
      id: 225,
      name: 'Shiloh Shepherd',
    },
    {
      id: 226,
      name: 'Siberian Husky',
    },
    {
      id: 228,
      name: 'Silky Terrier',
    },
    {
      id: 232,
      name: 'Smooth Fox Terrier',
    },
    {
      id: 233,
      name: 'Soft Coated Wheaten Terrier',
    },
    {
      id: 235,
      name: 'Spanish Water Dog',
    },
    {
      id: 236,
      name: 'Spinone Italiano',
    },
    {
      id: 238,
      name: 'Staffordshire Bull Terrier',
    },
    {
      id: 239,
      name: 'Standard Schnauzer',
    },
    {
      id: 242,
      name: 'Swedish Vallhund',
    },
    {
      id: 243,
      name: 'Thai Ridgeback',
    },
    {
      id: 244,
      name: 'Tibetan Mastiff',
    },
    {
      id: 245,
      name: 'Tibetan Spaniel',
    },
    {
      id: 246,
      name: 'Tibetan Terrier',
    },
    {
      id: 248,
      name: 'Toy Fox Terrier',
    },
    {
      id: 250,
      name: 'Treeing Walker Coonhound',
    },
    {
      id: 251,
      name: 'Vizsla',
    },
    {
      id: 253,
      name: 'Weimaraner',
    },
    {
      id: 254,
      name: 'Welsh Springer Spaniel',
    },
    {
      id: 256,
      name: 'West Highland White Terrier',
    },
    {
      id: 257,
      name: 'Whippet',
    },
    {
      id: 258,
      name: 'White Shepherd',
    },
    {
      id: 259,
      name: 'Wire Fox Terrier',
    },
    {
      id: 260,
      name: 'Wirehaired Pointing Griffon',
    },
    {
      id: 261,
      name: 'Wirehaired Vizsla',
    },
    {
      id: 262,
      name: 'Xoloitzcuintli',
    },
    {
      id: 264,
      name: 'Yorkshire Terrier',
    },
  ];

  const fuseOptions = {
    keys: ['name'],
  };

  const fuse = new Fuse(breeds, fuseOptions);

  function searchBreed(search) {
    const breedDropdown = document.querySelector('.ur-dropdown');
    breedDropdown.classList.remove('xhidden');
    // Clear all child elements of breedDropdown
    while (breedDropdown.firstChild) {
      breedDropdown.removeChild(breedDropdown.firstChild);
    }

    // Search using fuse
    const res = fuse.search(search);

    // Iterate through the search results
    res.forEach((result) => {
      const breedDiv = document.createElement('div');
      breedDiv.textContent = result.item.name;
      breedDiv.classList.add('ur-breed-result');
      breedDropdown.appendChild(breedDiv);
    });
    breedDropdown.scrollTop = 0;
  }

  function calculateRecommendation() {
    let daily = dogData.weight * 0.035;

    //if dog is 5kg or less, use .5% more
    if (dogData.weight <= 5) {
      daily = dogData.weight * 0.04;
    }

    if (dogData.ageCat === 'puppy') {
      daily = dogData.weight * 0.05;
    } else if (dogData.ageCat === 'senior') {
      daily = dogData.weight * 0.03;
      if (dogData.weight <= 5) {
        daily = dogData.weight * 0.035;
      }
    }

    //too_thin: 0,5% zusätzliche Futtermenge pro KG Körpergewicht Optimalgewicht: keine Änderung
    //too_thick: 0,5% weniger Futtermenge pro KG Körpergewicht
    //Check if weight preference is too_thin oder too_thick
    if (dogData.weight_preference === 'too_thin') {
      daily = daily + daily * 0.005 * dogData.weight;
    }

    if (dogData.weight_preference === 'too_thick') {
      daily = daily - daily * 0.005 * dogData.weight;
    }

    //Bei  active : 1,5% zusätzliche Futtermenge pro Kilogramm Körpergewicht Bei moderat: keine zusätzlich Menge
    //Bei not_active: keine zusätzliche Menge

    if (dogData.activity === 'active') {
      daily = daily + daily * 0.015 * dogData.weight;
    }

    //convert daily to grams and round to full numbers
    daily = Math.round(daily * 1000);
    console.log(daily);

    dogData.dailyGrammsResult = daily;

    //monthly amount
    const monthly = daily * 31;
    let cans = Math.round(monthly / 400);
    let canSize = '400g';
    if (daily > 400) {
      cans = Math.round(monthly / 800);
      canSize = '800g';
    }

    dogData.monthlyGrammsResult = monthly;

    const results = document.querySelector('#questionnaire-results');

    results.innerHTML = results.innerHTML.replace(/%\{daily\}/g, daily);
    results.innerHTML = results.innerHTML.replace(/%\{canSize\}/, canSize);
    results.innerHTML = results.innerHTML.replace(/%\{monthlyCans\}/, cans);

    results.innerHTML = results.innerHTML.replace(/%\{name\}/, dogData.name);

    const noticesContainer = results.querySelector('#notices');
    const noticeTemplate = noticesContainer.querySelector('.notice');
    dogData.notices.forEach((notice) => {
      const noticeClone = noticeTemplate.cloneNode(true);
      noticeClone.classList.remove('xhidden');
      noticeClone.innerHTML = noticeClone.innerHTML.replace(
        /%\{notice\}/,
        notice,
      );
      noticesContainer.appendChild(noticeClone);
    });

    let totalCount = cans; // Replace with your actual total count
    let ingredients = dogData.allergies;

    // Set count to 0 for products with a title containing an ingredient
    for (let id in window.ur_products) {
      const product = window.ur_products[id];
      for (let ingredient of ingredients) {
        if (product.title.includes(ingredient)) {
          product.count = 0;
        }

        if (ingredient === 'Rind') {
          if (product.title.includes('Wild')) {
            product.count = 0;
          }
        }
      }
    }

    // Calculate counts based on given ratios
    let redCount = Math.floor((3 / 7) * totalCount);
    let lightCount = Math.floor((3 / 7) * totalCount);
    let fishCount = totalCount - redCount - lightCount; // Using subtraction to avoid rounding errors

    // Distribute counts evenly among products of the same meat_type
    function distributeCounts(meatType, count) {
      const products = Object.values(window.ur_products).filter(
        (p) => p.meat_type.includes(meatType) && p.count !== 0,
      );

      let baseCount = Math.floor(count / products.length);
      let remainder = count % products.length;

      for (let product of products) {
        product.count = baseCount + (remainder > 0 ? 1 : 0);
        if (remainder > 0) remainder--;
      }
    }

    distributeCounts('red', redCount);
    distributeCounts('light', lightCount);
    distributeCounts('fish', fishCount);

    let queryString = '?canSize=' + canSize + '&recommendation=';

    for (let id in window.ur_products) {
      const product = window.ur_products[id];
      const productElement = results.querySelector(
        "[data-product-id='" + id + "']",
      );
      if (product && product.count !== undefined) {
        productElement.innerHTML = productElement.innerHTML.replace(
          /%\{count\}/g,
          product.count,
        );

        queryString += product.id + '*' + product.count + '-';
      }
    }

    const recomData = Object.assign({}, window.ur_products); 

    dogData.recommendation = {
      canSize: canSize,
      products: JSON.stringify(recomData),
    };

    console.log(window.ur_products)
    console.log(dogData.recommendation)
    document.querySelector('#bab-btn').href += queryString;

    for (let key in dogData) {
      if (typeof dogData[key] === 'object') {
        dogData[key] = JSON.stringify(dogData[key]);
      }
    }

    console.log(dogData)

    results.innerHTML = results.innerHTML.replace(/%\{name\}/, dogData.name);


    fetch(POST_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(dogData).toString(),
    })
      .then((response) => response.json()) // Assuming server responds with json
      .then((data) => console.log(data))
      .catch((error) => console.error('Error:', error));

    //Wait 2 seconds
    setTimeout(() => {
      document.querySelector('#slide-wrap').classList.add('xhidden');
      document.querySelector('#questionnaire-spinner').classList.add('xhidden');
      results.classList.remove('xhidden');
    }, 2000);
  }
});
