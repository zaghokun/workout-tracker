document.addEventListener('DOMContentLoaded', () => {

  const workoutForm = document.getElementById('workout-form');
  const workoutList = document.getElementById('workout-list');

  const muatWorkouts = async () => {
    // Fungsi ini tidak diubah
    try {
      const response = await fetch('/api/workouts');
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const workouts = await response.json();
      workoutList.innerHTML = ''; 
      if (workouts.length === 0) {
        workoutList.innerHTML = '<p class="loading">Belum ada riwayat latihan.</p>';
      } else {
        workouts.forEach(workout => {
          const item = document.createElement('div');
          item.className = 'workout-item';
          const tanggal = new Date(workout.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' });
          item.innerHTML = `<h3>${workout.namaLatihan}</h3><p><strong>Tanggal:</strong> ${tanggal}</p><p><strong>Detail:</strong> ${workout.set} set × ${workout.repetisi} repetisi</p><p><strong>Beban:</strong> ${workout.beban || 0} kg</p>`;
          workoutList.appendChild(item);
        });
      }
    } catch (error) {
      console.error('Error saat memuat workouts:', error);
    }
  };

  if (workoutForm) {
    workoutForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(workoutForm);
      const data = {
        namaLatihan: formData.get('namaLatihan'),
        set: formData.get('set'),
        repetisi: formData.get('repetisi'),
        beban: formData.get('beban') || 0,
      };

      try {
        const response = await fetch('/api/workouts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (response.ok) {
          workoutForm.reset();
          muatWorkouts();
        } else {
          const errorText = await response.text();
          console.error('Server merespons dengan error:', errorText);
          alert(`Gagal menyimpan latihan. Server merespons dengan status ${response.status}. Cek console browser.`);
        }
      } catch (error) {
        console.error('Error saat mengirim data:', error);
      }
    });
  }

  muatWorkouts();
});
