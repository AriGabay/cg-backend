const db = require('../../models/index');

class SiteSettingService {
  /** All settings as a plain { key: value } map, so callers do no shaping. */
  getAll = async () => {
    const rows = await db.SiteSetting.findAll();
    const map = {};
    (rows || []).forEach((row) => {
      map[row.key] = row.value;
    });
    return map;
  };

  /**
   * Upsert by key. An empty string is a legitimate value — it means "show
   * nothing here" — so only null/undefined is rejected.
   */
  set = async ({ key, value }) => {
    if (!key || typeof key !== 'string') throw Error('key is required');
    if (value === null || value === undefined) throw Error('value is required');
    const existing = await db.SiteSetting.findOne({ where: { key } });
    if (existing) {
      await db.SiteSetting.update({ value }, { where: { key } });
      return { key, value };
    }
    await db.SiteSetting.create({ key, value });
    return { key, value };
  };
}

module.exports = SiteSettingService;
