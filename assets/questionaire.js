document.addEventListener('DOMContentLoaded', function () {
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

  console.log('1::');

  const nextBtn = document.querySelector('.qur-next');
  const prevBtn = document.querySelector('.qur-prev');
  nextBtn.addEventListener('click', tryNext);
  prevBtn.addEventListener('click', back);

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
        break;
    }

    // Return whether the slide (all forms in it) is valid or not
    return true;
  }

  function next(currentActiveSlide) {
    // If an active slide is found, proceed
    if (currentActiveSlide) {
      // Set its active status to false and hide it
      currentActiveSlide.setAttribute('data-active', 'false');

      // Get the next slide
      const nextSlideIndex =
        parseInt(currentActiveSlide.getAttribute('data-slide')) + 1;
      const nextSlide = document.querySelector(
        `[data-slide="${nextSlideIndex}"]`,
      );

      prevBtn.classList.remove('!xhidden');

      // If there's a next slide, set it to active and show it
      if (nextSlide) {
        nextSlide.setAttribute('data-active', 'true');
      }
    }
  }

  function back() {
    const currentActiveSlide = document.querySelector('[data-active="true"]');
    // If an active slide is found, proceed
    if (currentActiveSlide) {
      // Set its active status to false and hide it
      currentActiveSlide.setAttribute('data-active', 'false');

      // Get the previous slide index
      const prevSlideIndex =
        parseInt(currentActiveSlide.getAttribute('data-slide'), 10) - 1;
      const prevSlide = document.querySelector(
        `[data-slide="${prevSlideIndex}"]`,
      );

      // If there's a previous slide, set it to active and show it
      if (prevSlide) {
        prevSlide.setAttribute('data-active', 'true');
      }

      // If we're at the first slide after moving back, hide the 'back' button
      if (prevSlideIndex === 1) {
        prevBtn.classList.add('!xhidden');
      }
    }
  }

  console.log('2::');

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

  console.log(breeds);
  console.log(Fuse);

  const fuseOptions = {
    keys: ['name'],
  };

  const fuse = new Fuse(breeds, fuseOptions);

  function searchBreed(search) {
    console.log(fuse.search(search));
  }
});
