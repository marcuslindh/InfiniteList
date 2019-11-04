class InfiniteList {
    private elm: HTMLElement;
    private data: any[];
    private pageSize: number;
    private CurrentMax: number;
    private RenderCallback: (elm: HTMLDivElement, item: any) => void;
    private filterCallback: (item: any) => boolean;

    constructor(elm: HTMLElement) {
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

    setData(data: any[]) {
        this.data = data;
        console.log(this.data.length);
    }

    setPageSize(size: number) {
        this.pageSize = size;
    }

    renderItem(callback: (elm: HTMLDivElement, item: any) => void) {
        this.RenderCallback = callback;
    }

    filterItem(callback: (item: any) => boolean) {
        this.filterCallback = callback;
    }

    update() {
        this.clear();
        this.render();
    }

    clear() {
        this.CurrentMax = 0;
        this.elm.innerHTML = "";
        this.elm.scroll(0, 0);
    }

    render() {
        if (!this.data) throw "No data added try function (setData([]))";
        if (!this.filterCallback) this.filterCallback = function (item) { return true };

        if (this.data.length === 0) return;

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
    }
}


