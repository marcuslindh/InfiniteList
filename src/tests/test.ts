
var data = [];

var filter = "";

for (var i = 0; i < 10000; i++) {
    data.push({ text: "Item " + i });
}


var list = new InfiniteList(document.getElementById("testlist"));

list.setData(data);

list.renderItem(function (elm, item: { text: string }) {
    elm.appendChild(document.createTextNode(item.text));
});

list.filterItem(function (item: { text: string }): boolean {
    if (filter === "") return true;

    if (item.text.toLowerCase().indexOf(filter) > -1) return true;

    return false;
});

list.render();

document.getElementById("Search").addEventListener("keyup", function () {
    filter = (document.getElementById("Search") as HTMLInputElement).value.toLowerCase();

    list.update();
});

document.getElementById("Search").addEventListener("click", function () {
    filter = (document.getElementById("Search") as HTMLInputElement).value.toLowerCase();

    list.update();
});

