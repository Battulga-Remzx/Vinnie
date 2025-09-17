const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const path = require('path');

// Initialize database with defaults
const file = path.join(process.cwd(), 'economy.json');
const adapter = new FileSync(file);
const db = low(adapter);

// Set defaults
db.defaults({ users: {}, items: {} }).write();

class Manager {
  constructor() {
    this.cooldowns = new Map();
  }

  fetchMoney(userId) {
    const userKey = `money_${userId}`;
    return db.get(['users', userKey]).value() || 0;
  }

  addMoney(userId, amount) {
    const userKey = `money_${userId}`;
    const current = db.get(['users', userKey]).value() || 0;
    const newAmount = current + amount;
    db.set(['users', userKey], newAmount).write();
    return newAmount;
  }

  subtractMoney(userId, amount) {
    const userKey = `money_${userId}`;
    const current = db.get(['users', userKey]).value() || 0;
    const newAmount = Math.max(0, current - amount);
    db.set(['users', userKey], newAmount).write();
    return newAmount;
  }

  daily(userId, amount, options = {}) {
    const cooldownKey = `daily_${userId}`;
    const now = Date.now();
    const lastDaily = this.cooldowns.get(cooldownKey) || 0;
    const cooldownTime = 24 * 60 * 60 * 1000; // 24 hours

    if (now - lastDaily < cooldownTime) {
      const remaining = cooldownTime - (now - lastDaily);
      return {
        onCooldown: true,
        time: remaining,
        amount: 0
      };
    }

    this.cooldowns.set(cooldownKey, now);
    const newBalance = this.addMoney(userId, amount);
    
    return {
      onCooldown: false,
      time: 0,
      amount: amount,
      after: newBalance
    };
  }

  weekly(userId, amount, options = {}) {
    const cooldownKey = `weekly_${userId}`;
    const now = Date.now();
    const lastWeekly = this.cooldowns.get(cooldownKey) || 0;
    const cooldownTime = 7 * 24 * 60 * 60 * 1000; // 7 days

    if (now - lastWeekly < cooldownTime) {
      const remaining = cooldownTime - (now - lastWeekly);
      return {
        onCooldown: true,
        time: remaining,
        amount: 0
      };
    }

    this.cooldowns.set(cooldownKey, now);
    const newBalance = this.addMoney(userId, amount);
    
    return {
      onCooldown: false,
      time: 0,
      amount: amount,
      after: newBalance
    };
  }

  beg(userId, amount, options = {}) {
    const cooldownKey = `beg_${userId}`;
    const now = Date.now();
    const lastBeg = this.cooldowns.get(cooldownKey) || 0;
    const cooldownTime = 5 * 60 * 1000; // 5 minutes

    if (now - lastBeg < cooldownTime) {
      const remaining = cooldownTime - (now - lastBeg);
      return {
        onCooldown: true,
        time: remaining,
        amount: 0
      };
    }

    this.cooldowns.set(cooldownKey, now);

    // Simulate random beg outcomes
    let finalAmount = amount;
    let lost = false;

    if (options.canLose && Math.random() < 0.3) {
      finalAmount = -Math.floor(amount * 0.5);
      lost = true;
    } else {
      finalAmount = Math.floor(amount * (0.5 + Math.random() * 0.5));
    }

    const newBalance = this.addMoney(userId, finalAmount);
    
    return {
      onCooldown: false,
      time: 0,
      amount: finalAmount,
      lost: lost,
      after: newBalance
    };
  }

  work(userId, amount, options = {}) {
    const cooldownKey = `work_${userId}`;
    const now = Date.now();
    const lastWork = this.cooldowns.get(cooldownKey) || 0;
    const cooldownTime = 30 * 60 * 1000; // 30 minutes

    if (now - lastWork < cooldownTime) {
      const remaining = cooldownTime - (now - lastWork);
      return {
        onCooldown: true,
        time: remaining,
        amount: 0
      };
    }

    this.cooldowns.set(cooldownKey, now);
    const workAmount = Math.floor(amount * (0.8 + Math.random() * 0.4));
    const newBalance = this.addMoney(userId, workAmount);
    
    return {
      onCooldown: false,
      time: 0,
      amount: workAmount,
      after: newBalance
    };
  }
}

// Database adapter object that mimics Eco.db
const dbAdapter = {
  fetch(key) {
    return db.get(['users', key]).value() || 0;
  },

  set(key, value) {
    db.set(['users', key], value).write();
    return value;
  },

  add(key, amount) {
    const current = db.get(['users', key]).value() || 0;
    const newAmount = current + amount;
    db.set(['users', key], newAmount).write();
    return newAmount;
  },

  subtract(key, amount) {
    const current = db.get(['users', key]).value() || 0;
    const newAmount = Math.max(0, current - amount);
    db.set(['users', key], newAmount).write();
    return newAmount;
  },

  delete(key) {
    db.unset(['users', key]).write();
    return true;
  }
};

module.exports = {
  Manager,
  db: dbAdapter
};