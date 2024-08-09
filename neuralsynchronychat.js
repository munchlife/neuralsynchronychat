class NeuralSynchronyAlgorithm {
  constructor() {
    this.lives = new Map();
  }

  // Add a new life to the system
  addLife(id, initialPhase = Math.random() * 2 * Math.PI) {
    this.lives.set(id, { phase: initialPhase, lastUpdate: Date.now() });
  }

  // Update the phase of a life
  updatePhase(id, newPhase) {
    if (this.lives.has(id)) {
      const life = this.lives.get(id);
      life.phase = newPhase;
      life.lastUpdate = Date.now();
    }
  }

  // Calculate PLV between two lives
  calculatePLV(id1, id2) {
    if (!this.lives.has(id1) || !this.lives.has(id2)) {
      return 0;
    }

    const life1 = this.lives.get(id1);
    const life2 = this.lives.get(id2);

    const phaseDiff = Math.abs(life1.phase - life2.phase);
    return Math.cos(phaseDiff);
  }

  // Calculate overall synchrony score for all lives
  calculateOverallSynchrony() {
    const lifeIds = Array.from(this.lives.keys());
    let totalPLV = 0;
    let pairs = 0;

    for (let i = 0; i < lifeIds.length; i++) {
      for (let j = i + 1; j < lifeIds.length; j++) {
        totalPLV += this.calculatePLV(lifeIds[i], lifeIds[j]);
        pairs++;
      }
    }

    return pairs > 0 ? totalPLV / pairs : 0;
  }

  // Simulate interaction between lives
  simulateInteraction(duration = 1000, updateInterval = 100) {
    const start = Date.now();
    const intervalId = setInterval(() => {
      this.lives.forEach((life, id) => {
        // Simulate phase change (you can replace this with actual EEG data)
        const newPhase = (life.phase + Math.random() * 0.1) % (2 * Math.PI);
        this.updatePhase(id, newPhase);
      });

      const synchronyScore = this.calculateOverallSynchrony();
      console.log(`Current synchrony score: ${synchronyScore.toFixed(4)}`);

      if (Date.now() - start >= duration) {
        clearInterval(intervalId);
        console.log("Interaction simulation complete.");
      }
    }, updateInterval);
  }
}

// Usage example
const synchronyAlgorithm = new NeuralSynchronyAlgorithm();

synchronyAlgorithm.addLife('life1');
synchronyAlgorithm.addLife('life2');
synchronyAlgorithm.addLife('life3');

synchronyAlgorithm.simulateInteraction(5000); // Simulate for 5 seconds