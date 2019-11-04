var InfiniteList = (function () {
    function InfiniteList(elm) {
        this.elm = elm;
        this.pageSize = 30;
        this.CurrentMax = 0;
        var tmp = this;
        this.elm.addEventListener("scroll", function () {
            if (tmp.CurrentMax < tmp.data.length) {
                if (this.scrollTop >= ((this.scrollHeight - this.clientHeight) - 100)) {
                    tmp.render();
                }
            }
        }, true);
    }
    InfiniteList.prototype.setData = function (data) {
        this.data = data;
        console.log(this.data.length);
    };
    InfiniteList.prototype.setPageSize = function (size) {
        this.pageSize = size;
    };
    InfiniteList.prototype.renderItem = function (callback) {
        this.RenderCallback = callback;
    };
    InfiniteList.prototype.filterItem = function (callback) {
        this.filterCallback = callback;
    };
    InfiniteList.prototype.update = function () {
        this.clear();
        this.render();
    };
    InfiniteList.prototype.clear = function () {
        this.CurrentMax = 0;
        this.elm.innerHTML = "";
        this.elm.scroll(0, 0);
    };
    InfiniteList.prototype.render = function () {
        if (!this.data)
            throw "No data added try function (setData([]))";
        if (!this.filterCallback)
            this.filterCallback = function (item) { return true; };
        if (this.data.length === 0)
            return;
        var length = this.pageSize;
        if (length > this.data.length) {
            length = this.data.length;
        }
        var renderdindex = 0;
        var index = this.CurrentMax;
        while ((renderdindex < length) && index < this.data.length) {
            if (this.filterCallback(this.data[index]) === true) {
                var item = document.createElement("div");
                item.classList.add("InfiniteList-item");
                this.RenderCallback(item, this.data[index]);
                this.elm.appendChild(item);
                renderdindex++;
            }
            index++;
        }
        this.CurrentMax = index;
    };
    return InfiniteList;
}());
//# sourceMappingURL=InfiniteList.js.map