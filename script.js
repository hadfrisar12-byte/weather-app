// Ganti teks di bawah dengan API Key yang Anda dapatkan dari OpenWeatherMap
const apiKey = "f405fd74fdf0c5a32a98ad7d00fff482"; 

const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");

// Event ketika tombol "Cari" diklik
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();
    if (city !== "") {
        getWeatherData(city);
    } else {
        alert("Silakan masukkan nama kota terlebih dahulu!");
    }
});

// Event tambahan: Bisa tekan tombol "Enter" di keyboard
cityInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        searchBtn.click();
    }
});

// Fungsi untuk mengambil data dari API
async function getWeatherData(city) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=id`;

    try {
        const response = await fetch(url);
        
        // Jika kota tidak ditemukan atau ada error
        if (!response.ok) {
            throw new Error("Kota tidak ditemukan. Periksa kembali ejaan nama kota!");
        }

        const data = await response.json();

        // Masukkan data dari API ke elemen HTML
        cityName.textContent = `${data.name}, ${data.sys.country}`;
        temperature.textContent = `${Math.round(data.main.temp)} °C`;
        description.textContent = data.weather[0].description;

    } catch (error) {
        alert(error.message);
        cityName.textContent = "-";
        temperature.textContent = "-- °C";
        description.textContent = "Kondisi cuaca";
    }
}