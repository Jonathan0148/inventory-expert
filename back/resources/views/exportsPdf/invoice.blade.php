<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Factura</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Dosis:wght@300;400;500;600;700&family=Fugaz+One&family=Noto+Sans+Ethiopic:wght@200;300;400;500;600&family=Silkscreen&display=swap');

        * {
            box-sizing: border-box;
        }

        body {
            /* margin-right: 100px; */
            font-family: 'Poppins', sans-serif;
            background-color: #f8f8f8;
        }

        .ticket {
            background-color: #ffffff;
            box-shadow: 0 0 px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            margin-left: -35px;
            width: 150px;
            text-align: center;
        }
        img{
            width: 80px;
        }
        .logo{
            display: block;
            margin: 0 auto 10px;
            text-align: center;
        }

        .center {
            text-align: center;
            margin: 10px 0;
            font-size: 8px; /* Tamaño de fuente más pequeño */
        }

        .left {
            /* text-align: left; */
            font-size: 8px; /* Tamaño de fuente más pequeño */
        }

        .right {
            text-align: right;
            font-size: 8px; /* Tamaño de fuente más pequeño */
        }

        .table {
            margin-left: 10px;
            border-collapse: collapse;
        }

        th, td {
            text-align: left;
            border-bottom: 1px solid #dddddd;
            font-size: 8px; /* Tamaño de fuente más pequeño */
        }

        th {
            background-color: #f2f2f2;
        }

        .detail {
            border-top: 1px solid black;
            border-bottom: 1px solid black;
        }

        .footer {
            margin-top: 10px;
            text-align: center;
            font-size: 8px; /* Tamaño de fuente más pequeño */
        }
    </style>
</head>
<body>
    <div class="ticket">
        <div class="header-fix">
            <div class="logo">
                <img src="img/logo_market_2.png" alt="Logotipo">
            </div>
            <p class="center">
                <b>{{ @$data['nameLocal'] }}</b>
                <br>Cel: {{ @$data['cellphoneLocal'] }}
                <br>{{ @$data['cityLocal'] }}, {{ @$data['departmentLocal'] }} {{ @$data['directionLocal'] }}
            </p>
            <p class="center">
                <b>Referencia de venta # {{ @$data['referenceSale'] }}</b>
                <br>{{ @$data['date'] }}
            </p>
            <p class="left">
                <b>Cajero: </b>{{ @$data['seller'] }}
            </p>
        </div>
        <table class="table">
            <tr>
                <th>Producto</th>
                <th>Cant.</th>
                <th>Valor</th>
            </tr>
            <tbody>
                @foreach(@$data['detailSail'] as $value)
                    <tr class="detail">
                        <td>{{ @$value['name'] }}</td>
                        <td>{{ @$value['amount'] }}</td>
                        <td>${{ number_format(@$value['price']) }}</td>
                    </tr>
                @endforeach
                <tr>
                    <td></td>
                    <td><b>Subtotal:</b></td>
                    <td>${{ number_format(@$data['subtotal']) }}</td>
                </tr>
                <tr>
                    <td></td>
                    <td><b>Iva:</b></td>
                    <td>{{ @$data['tax'] }}%</td>
                </tr>
                <tr>
                    <td></td>
                    <td><b>Total:</b></td>
                    <td>${{ number_format(@$data['total']) }}</td>
                </tr>
                <tr>
                    <td><b>Método de pago:</b></td>
                    <td></td>
                    <td>{{ @$data['paymentMethod'] }}</td>
                </tr>
            </tbody>
        </table>
        <p class="footer"><b>¡Gracias por su compra!</b></p>
    </div>
</body>
</html>
