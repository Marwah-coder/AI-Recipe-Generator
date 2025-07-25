const https = require('https');
const fs = require('fs');
const path = require('path');

// Sample food images from Unsplash (free to use)
const images = [
  {
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400&h=300&fit=crop',
    filename: 'stir-fry-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    filename: 'stir-fry-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop',
    filename: 'stir-fry-3.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    filename: 'vegetable-soup.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    filename: 'tomato-soup.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    filename: 'buddha-bowl.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    filename: 'grain-bowl.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop',
    filename: 'salad-bowl.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    filename: 'creamy-pasta.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    filename: 'tomato-pasta.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2e5?w=400&h=300&fit=crop',
    filename: 'pesto-pasta.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    filename: 'fish-tacos.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    filename: 'vegetable-tacos.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
    filename: 'chicken-tacos.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    filename: 'vegetable-casserole.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    filename: 'potato-casserole.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop',
    filename: 'rice-casserole.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    filename: 'garden-salad.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    filename: 'caesar-salad.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
    filename: 'quinoa-salad.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop',
    filename: 'chicken-curry.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop',
    filename: 'vegetable-curry.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1563379091339-03246963d4a9?w=400&h=300&fit=crop',
    filename: 'lentil-curry.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    filename: 'margherita-pizza.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    filename: 'vegetable-pizza.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=400&h=300&fit=crop',
    filename: 'bbq-pizza.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    filename: 'veggie-burger.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    filename: 'chicken-burger.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop',
    filename: 'bean-burger.jpg'
  }
];

const assetsDir = path.join(__dirname, 'src', 'assets');

// Create assets directory if it doesn't exist
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filepath = path.join(assetsDir, filename);
    const file = fs.createWriteStream(filepath);
    
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {}); // Delete the file if there was an error
      console.error(`Error downloading ${filename}:`, err.message);
      reject(err);
    });
  });
}

async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Failed to download ${image.filename}`);
    }
  }
  
  console.log('All downloads completed!');
}

downloadAllImages(); 