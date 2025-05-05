const addButton = document.getElementById('add-guest-button');
const guestNameInput = document.getElementById('guest-name-input');
const guestList = document.getElementById('guest-list');

addButton.addEventListener('click', function () {
  const guestName = guestNameInput.value.trim();

  if (guestName !== '') {
    const listItem = document.createElement('li');

    // Buat elemen teks dan tombol edit/hapus
    const nameSpan = document.createElement('span');
    nameSpan.textContent = guestName;

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'edit-btn';

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Hapus';
    deleteButton.className = 'delete-btn';

    // Tambahkan semua ke <li>
    listItem.appendChild(nameSpan);
    listItem.appendChild(editButton);
    listItem.appendChild(deleteButton);
    guestList.appendChild(listItem);

    guestNameInput.value = '';

    // Fungsi hapus
    deleteButton.addEventListener('click', function () {
      guestList.removeChild(listItem);
    });

    // Fungsi edit
    editButton.addEventListener('click', function () {
      const newName = prompt('Edit nama tamu:', nameSpan.textContent);
      if (newName && newName.trim() !== '') {
        nameSpan.textContent = newName.trim();
      }
    });
  } else {
    alert('Masukkan nama anda terlebih dahulu!');
  }
});

// FETCH KOMENTAR API
document.addEventListener("DOMContentLoaded", function () {
  fetch('https://jsonplaceholder.typicode.com/posts/3/comments')
    .then(response => {
      if (!response.ok) throw new Error("Gagal mengambil data JSON.");
      return response.json();
    })
    .then(data => {
      const list = document.getElementById("apiList");
      data.forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>${post.name}</strong> (${post.email}): ${post.body}`;
        list.appendChild(li);
      });
    })
    .catch(error => {
      console.error("Terjadi kesalahan:", error);
    });
});

document.addEventListener('DOMContentLoaded', function () {
  // Ambil kontainer media
  const mediaRow = document.getElementById('mediaRow');
  const API_KEY = '2fa141htuhUbBSWGT25SPWzVc35t5J2AyLpuH8KwCzHPpxfPkLxwivAJ';

  // Data gambar statis
  const photos = [
    {
      url: "https://images.pexels.com/photos/4887151/pexels-photo-4887151.jpeg/",
      title: "Photo by Kaboompics.com"
    },
    {
      url:"https://images.pexels.com/photos/7394476/pexels-photo-7394476.jpeg/",
      title:"Photo by Ivan Samkos"
    },
    {
      url:"https://images.pexels.com/photos/29765798/pexels-photo-29765798.jpeg/",
      title:"Photo by Jilly Noble"
    },
    {
      url: "https://images.pexels.com/photos/10054560/pexels-photo-10054560.jpeg/",
      title: "Photo by Ron Lach"
    },
    {
      url:"https://images.pexels.com/photos/6578921/pexels-photo-6578921.jpeg/",
      title:"Photo by Andres Ayrton"
    },
    {
      url: "https://images.pexels.com/photos/8845109/pexels-photo-8845109.jpeg/",
      title: "Photo by Yaroslav Shuraev"
    }
  ];

  // Tambahkan gambar ke mediaRow
  photos.forEach(photo => {
    const div = document.createElement("div");
    div.className = "media-item";
    div.innerHTML = `
      <img src="${photo.url}" alt="${photo.title}" />
      <p>${photo.title}</p>
    `;
    mediaRow.appendChild(div);
  });

  // Fungsi untuk menambahkan elemen video
  function addVideo(videoId, title) {
    fetch(`https://api.pexels.com/videos/videos/${videoId}`, {
      headers: {
        Authorization: API_KEY
      }
    })
      .then(response => response.json())
      .then(data => {
        const videoFile = data.video_files.find(
          file => file.quality === 'sd' && file.file_type === 'video/mp4'
        );

        if (!videoFile) throw new Error("Video file tidak ditemukan.");

        const div = document.createElement("div");
        div.className = "media-item";
        div.innerHTML = `
          <video src="${videoFile.link}" autoplay muted loop controls></video>
          <p>${title}</p>
        `;
        mediaRow.appendChild(div);
      })
      .catch(error => {
        console.error("Gagal memuat video:", error);
      });
  }

  addVideo('4109927/', 'Video by Gustavo Fring');
  addVideo('6698401/', 'Vidio by Cottonbro Studio');
  addVideo('5881568/', 'Video by Kaboompics.com');
});
