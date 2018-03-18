# 为什么要用 orm

starhub 希望能够把数据储存在本地作为一个离线应用。chrome storage 的存储结构太薄，没有提供关系型数据库。而事实上 Tag、Repo 之间是存在多对多的关系。考虑到查询和修改的方便，需要提供 orm。

# References

- [Defining Relationships · Vuex ORM](https://vuex-orm.github.io/vuex-orm/relationships/defining-relationships.html)
