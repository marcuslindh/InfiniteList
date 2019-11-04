# InfiniteList is a infinite scrollable list in javascript

```Typescript

var filter = "";

var data = [];
data.push({text: "item1"});
data.push({text: "item2"});
data.push({text: "item3"});

var list = new InfiniteList(document.getElementById("list"));

//add data to list
list.setData(data);

//render item
list.renderItem(function (elm, item: { text: string }) {
    elm.appendChild(document.createTextNode(item.text));
});

//filter item based on filter
list.filterItem(function (item: { text: string }): boolean {
    if (filter === "") return true;

    if (item.text.toLowerCase().indexOf(filter) > -1) return true;

    return false;
});

//Start render list
list.render();


document.getElementById("Search").addEventListener("keyup", function () {
    filter = (document.getElementById("Search") as HTMLInputElement).value.toLowerCase();

    //reset list and render list to filter items
    list.update();
});

```
