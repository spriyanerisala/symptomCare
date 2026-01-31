

const Home = () => {
  return (
    <>
    

      <section className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Predict Health Issues Early
        </h1>
        <p className="text-lg max-w-2xl mx-auto">
          Ayurvedic guidance + Hospital consultation using intelligent
          health prediction (Not diagnosis).
        </p>
      </section>

      <section className="py-16 px-8 grid md:grid-cols-3 gap-8">
        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">🩺 Symptom Checker</h3>
          <p>Predict possible health conditions from symptoms.</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">🌿 Ayurveda</h3>
          <p>Safe home remedies for common health issues.</p>
        </div>

        <div className="bg-white shadow rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold mb-2">🏥 Doctor Support</h3>
          <p>Automatic appointment booking when needed.</p>
        </div>
      </section>

      <footer className="bg-gray-100 text-center py-4 text-sm">
        ⚠️ This platform provides predictions only. Not medical diagnosis.
      </footer>
    </>
  );
};

export default Home;
