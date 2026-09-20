
const categoriesData =  [
      {
        "name": "Set Design",
        "images": [
          "images/optimized/setdesign/1.webp",
          "images/optimized/setdesign/2.webp",
          "images/optimized/setdesign/3.webp",
          "images/optimized/setdesign/4.webp",
          "images/optimized/setdesign/5.webp",
          "images/optimized/setdesign/6.webp",
          "images/optimized/setdesign/7.webp",
          "images/optimized/setdesign/8.webp",
          "images/optimized/setdesign/9.webp",
          "images/optimized/setdesign/10.webp",
          "images/optimized/setdesign/11.webp"
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
          "images/optimized/photographseries/1.webp",
          "images/optimized/photographseries/2.webp",
          "images/optimized/photographseries/3.webp",
          "images/optimized/photographseries/4.webp",
          "images/optimized/photographseries/5.webp"
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
          "images/optimized/floral/1.webp",
          "images/optimized/floral/2.webp",
          "images/optimized/floral/3.webp",
          "images/optimized/floral/4.webp",
          "images/optimized/floral/5.webp",
          "images/optimized/floral/6.webp",
          "images/optimized/floral/7.webp",
          "images/optimized/floral/8.webp"
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
          "images/optimized/interiorstyling/1.webp",
          "images/optimized/interiorstyling/2.webp",
          "images/optimized/interiorstyling/3.webp",
          "images/optimized/interiorstyling/4.webp",
          "images/optimized/interiorstyling/5.webp",
          "images/optimized/interiorstyling/6.webp",
          "images/optimized/interiorstyling/7.webp",
          "images/optimized/interiorstyling/8.webp",
          "images/optimized/interiorstyling/9.webp",
          "images/optimized/interiorstyling/10.webp",
          "images/optimized/interiorstyling/11.webp"  
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
          "images/optimized/arrangement/1.webp",
          "images/optimized/arrangement/2.webp",
          "images/optimized/arrangement/3.webp",
          "images/optimized/arrangement/4.webp",
          "images/optimized/arrangement/5.webp",
          "images/optimized/arrangement/6.webp",
          "images/optimized/arrangement/7.webp",
          "images/optimized/arrangement/8.webp",
          "images/optimized/arrangement/9.webp",
          "images/optimized/arrangement/10.webp",
          "images/optimized/arrangement/11.webp",
          "images/optimized/arrangement/12.webp",
          "images/optimized/arrangement/13.webp",
          "images/optimized/arrangement/14.webp",
          "images/optimized/arrangement/15.webp",
          "images/optimized/arrangement/16.webp",
          "images/optimized/arrangement/17.webp",
          "images/optimized/arrangement/18.webp",
          "images/optimized/arrangement/19.webp",
          "images/optimized/arrangement/20.webp",
          "images/optimized/arrangement/21.webp",
          "images/optimized/arrangement/22.webp"
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