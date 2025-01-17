
const categoriesData =  [
      {
        "name": "Set Design",
        "images": [
          "images/setdesign/1.jpg",
          "images/setdesign/2.jpg",
          "images/setdesign/3.jpg",
          "images/setdesign/4.jpg",
          "images/setdesign/5.jpg",
          "images/setdesign/6.jpg",
          "images/setdesign/7.jpg",
          "images/setdesign/8.jpg",
          "images/setdesign/9.jpg",
          "images/setdesign/10.jpg",
          "images/setdesign/11.jpg"
        ],
        "descriptions": [
          "Elegant stage setup for events.",
          "Creative use of colors and lights.",
          "Minimalist set design for exhibitions.",
          "Dynamic background arrangement.",
          "Modern and stylish decor elements.",
          "Timeless and elegant composition.",
          "Detailed craftsmanship in every corner.",
          "Innovative designs that inspire.",
          "Functionality and beauty combined.",
          "Sophisticated layouts for any occasion.",
          "A celebration of artistic creativity."
        ],
        "credits": [
          "Photo by John Doe",
          "Photo by Jane Doe",
          "Photo by John Smith",
          "Photo by Emily Davis",
          "Photo by Alex Taylor",
          "Photo by Emma Johnson",
          "Photo by Liam Brown",
          "Photo by Ava Wilson",
          "Photo by Sophia Martinez",
          "Photo by Mia Anderson",
          "Photo by William Thomas"
        ]
      },
      {
        "name": "Photography Series",
        "images": [
          "images/photographseries/1.jpg",
          "images/photographseries/2.jpg",
          "images/photographseries/3.jpg",
          "images/photographseries/4.jpg",
          "images/photographseries/5.jpg"
        ],
        "descriptions": [
          "Beautiful landscape with sunset.",
          "A serene portrait of a traveler.",
          "Majestic mountain scenery.",
          "Urban photography with vibrant colors.",
          "Peaceful countryside view."
        ],
        "credits": [
          "Photo by Alice Williams",
          "Photo by Bob Harris",
          "Photo by Charlie Green",
          "Photo by Danielle White",
          "Photo by Ethan Adams"
        ]
      },
      {
        "name": "Floral Accessories",
        "images": [
          "images/floral/1.jpg",
          "images/floral/2.jpg",
          "images/floral/3.jpg",
          "images/floral/4.jpg",
          "images/floral/5.jpg",
          "images/floral/6.jpg",
          "images/floral/7.jpg",
          "images/floral/8.jpg"
        ],
        "descriptions": [
          "Elegant floral arrangement for weddings.",
          "Vibrant bouquet with seasonal flowers.",
          "Rustic floral decor with natural elements.",
          "Modern centerpiece for special events.",
          "Charming bouquet for intimate gatherings.",
          "A mix of fresh and dried flowers.",
          "Artistic floral composition for photography.",
          "Floral jewelry designed for elegance."
        ],
        "credits": [
          "Photo by Carol Baker",
          "Photo by Dave Clark",
          "Photo by Fiona Evans",
          "Photo by George Hall",
          "Photo by Hannah Lee",
          "Photo by Ian Parker",
          "Photo by Julia Roberts",
          "Photo by Kevin Stewart"
        ]
      },
      {
        "name": "Interior Styling",
        "images": [
          "images/interiorstyling/1.jpg",
          "images/interiorstyling/2.jpg",
          "images/interiorstyling/3.jpg",
          "images/interiorstyling/4.jpg",
          "images/interiorstyling/5.jpg",
          "images/interiorstyling/6.jpeg",
          "images/interiorstyling/7.jpeg",
          "images/interiorstyling/8.jpeg",
          "images/interiorstyling/9.jpg",
          "images/interiorstyling/10.jpg",
          "images/interiorstyling/11.jpeg"  
        ],
        "descriptions": [
          "Cozy living room setup with neutral tones."
         
        ],
        "credits": [
          "Photo by Lauren Hughes"
      
        ]
      },
      {
        "name": "Arrangements",
        "images": [
          "images/arrangement/1.jpg",
          "images/arrangement/2.jpg",
          "images/arrangement/3.jpg",
          "images/arrangement/4.jpg",
          "images/arrangement/5.jpg",
          "images/arrangement/6.jpg",
          "images/arrangement/7.jpg",
          "images/arrangement/8.jpg",
          "images/arrangement/9.jpg",
          "images/arrangement/10.jpg",
          "images/arrangement/11.jpg",
          "images/arrangement/12.jpg",
          "images/arrangement/13.jpg",
          "images/arrangement/14.jpg",
          "images/arrangement/15.jpg",
          "images/arrangement/16.jpg",
          "images/arrangement/17.jpg",
          "images/arrangement/18.jpg",
          "images/arrangement/19.jpg",
          "images/arrangement/20.jpg",
          "images/arrangement/21.jpg",
          "images/arrangement/22.jpg"
        ],
        "descriptions": [
          "Elegant arrangement for corporate events."
        ],
        "credits": [
          "Photo by Wendy Powell"
        ]
      }
    ];
  
  

  function displayCategories() {
    const container = document.getElementById('categories-container');
    container.innerHTML = ''; // Clear the container before rendering
  
    categoriesData.forEach((category, index) => {
      const categoryDiv = document.createElement('div');
      categoryDiv.classList.add('category-card');
  
      categoryDiv.innerHTML = `
        <h4>${category.name}</h4>
        <p>${category.descriptions.join(', ')}</p>
        <p><strong>Credits:</strong> ${category.credits.join(', ')}</p>
        <button onclick="editCategory(${index})">Edit</button>
        <button onclick="deleteCategory(${index})">Delete</button>
      `;
  
      container.appendChild(categoryDiv);
    });
  }
  
  function createCategory() {
    const name = document.getElementById('new-category-name').value;
    const description = document.getElementById('new-category-description').value;
  
    if (name && description) {
      categoriesData.push({
        name: name,
        images: [], // Images can be handled separately
        descriptions: [description],
        credits: [] // Credits can be added as well
      });
      displayCategories();
      document.getElementById('new-category-name').value = '';
      document.getElementById('new-category-description').value = '';
    } else {
      alert('Please provide both name and description.');
    }
  }
  
  function editCategory(index) {
    const category = categoriesData[index];
    const newName = prompt('Edit Category Name:', category.name);
    const newDescription = prompt('Edit Description:', category.descriptions.join(', '));
  
    if (newName && newDescription) {
      categoriesData[index] = {
        ...category,
        name: newName,
        descriptions: newDescription.split(','),
      };
      displayCategories();
    }
  }
  
  function deleteCategory(index) {
    if (confirm('Are you sure you want to delete this category?')) {
      categoriesData.splice(index, 1);
      displayCategories();
    }
  }
  
  // Initial render
  displayCategories();