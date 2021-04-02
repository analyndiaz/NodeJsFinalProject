const { Member } = require("../entities");
const BaseRepository = require("./baseRepository");

class MemberRepository extends BaseRepository {
  constructor() {
    super(Member);
  }

  async insert(data) {
    const newMember = new Member({
      name: data.name,
      joinedDate: data.joinedDate,
      status: data.status,
    });

    await this.save(newMember);
  }

  async update(id, data) {
    const dbMember = await this.getById(id);

    if (!dbMember) {
      return;
    }

    if (data.name !== undefined) dbMember.name = data.name;
    if (data.joinedDate !== undefined) dbMember.joinedDate = data.joinedDate;
    if (data.status !== undefined) dbMember.status = data.status;

    await this.save(dbMember);
  }

  async search(name, status) {
    let filter = {};
    if (name) filter.name = name;
    if (status) filter.status = status;

    return await this.getByFilter(filter);
  }
}

module.exports = new MemberRepository();
