var drawPieChart = function (expenses) {
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(function () {
        var total = {};
        for (var i = 0; i < expenses.length; i++) {
            var category = expenses[i]['category'],
                money_spent = parseFloat(expenses[i]['money_spent']);
            if (category in total) {
                total[category] += money_spent;
            } else {
                total[category] = money_spent;
            }
        }
        var content = [
            ['Expenses', 'Spent per Month']
        ];
        var i = 1;
        for (category in total) {
            content[i++] = [category, total[category]];
        }
        var data = google.visualization.arrayToDataTable(content);
        var options = {
            'title': 'This Month',
            'width': 400,
            'height': 400
        };
        var chart = new google.visualization.PieChart(document.getElementById('piechart'));
        chart.draw(data, options);
        drawGraph(total);
    });
};
var drawGraph = function (total) {
    var labels = Object.keys(total);
    var values = [];
    labels.forEach(function (key) {
        values.push(total[key]);
    });
    $("#div-graph").html('<canvas id="graph"></canvas>');
    var canvas = document.getElementById("graph");
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: '# of Money spent',
                data: values,
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
};

function getExpenses() {
    $.ajax({
        type: "POST",
        url: "/expenses",
        headers: {
            'CSRF-Token': $('[name="csrf_token"]').attr('content'),
        },
    }).done(function (res) {
        if (res.code == undefined) {
            return;
        }
        var expenses = res.expenses;
        var code = "";
        for (var i = expenses.length - 1; i >= 0; i--) {
            var expense = expenses[i];
            code += `
            <div class="">
                <div class="card border-primary" style="margin-top:10px;">
                    <div class="card-header">${expense.category}</div>
                    <div class="card-body text-primary">
                        <p class="card-text">
                            Money Spent : ${expense.money_spent}
                        </p>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">
                            Spent at : ${expense['spent_at_date']} ${expense['spent_at_time']} ${expense['spent_at_merediem']}
                        </small>
                    </div>
                </div>
            </div>
            `;
        }
        $("#expenses").html(code);
        drawPieChart(res['expenses']);
    });
}
getExpenses();

function getNotes() {
    $.ajax({
        type: "POST",
        url: "/notes",
        headers: {
            'CSRF-Token': $('[name="csrf_token"]').attr('content'),
        },
    }).done(function (res) {
        if (res.code == undefined) {
            return;
        }
        var notes = res.notes;
        var code = "";
        for (var i = notes.length - 1; i >= 0; i--) {
            var note = notes[i];
            code += `
            <div class="">
                <div class="card border-primary" style="margin-top:10px;box-shadow: 7px 7px 5px #aaaaaa;">
                    <div class="card-header">${note.title}</div>
                    <div class="card-body text-primary">
                        <p class="card-text">${note.description}</p>
                    </div>
                </div>
            </div>
            `;
        }
        $("#notes").html(code);
    });
}
getNotes();
$("#expense").on("submit", function () {
    var data = {};
    data['category'] = $("#category").val();
    data['money_spent'] = $("#money_spent").val();
    data['spent_at_date'] = $("#spent_at_date").val();
    data['spent_at_time'] = $("#spent_at_time").val();
    data['spent_at_merediem'] = $("#spent_at_merediem").val();
    $.ajax({
        type: "POST",
        data: data,
        url: "/expense",
        headers: {
            'CSRF-Token': $('[name="csrf_token"]').attr('content'),
        },
    }).done(function (res) {
        if (res.code == undefined) {
            return;
        }
        if (res.code == 0) {
            $("#alert").attr("class", "alert-success");
        } else {
            $("#alert").attr("class", "alert-danger");
        }
        getExpenses();
        $("#alert").html(res.message);
        $("#alert").show();
        setTimeout(function () {
            $("#alert").hide();
        }, 2000);
    });
    return false;
});
$("#note").on("submit", function () {
    var data = {};
    data['title'] = $("#title").val();
    data['description'] = $("#description").val();
    $.ajax({
        type: "POST",
        data: data,
        url: "/note",
        headers: {
            'CSRF-Token': $('[name="csrf_token"]').attr('content'),
        },
    }).done(function (res) {
        if (res.code == undefined) {
            return;
        }
        if (res.code == 0) {
            $("#alert").attr("class", "alert-success");
        } else {
            $("#alert").attr("class", "alert-danger");
        }
        $("#alert").html(res.message);
        $("#alert").show();
        getNotes();
        setTimeout(function () {
            $("#alert").hide();
        }, 2000);
    });
    return false;
});