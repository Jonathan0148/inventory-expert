<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\settings\Module;

class ModulesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $data = [
            [
                "id" => 1,
                "code" => 11,
                "name" => "Roles",
                "description" => "El módulo de roles administra y registra los distintos roles o perfiles de usuarios dentro del sistema. Permite definir y asignar roles a los usuarios, determinando así sus permisos y nivel de acceso a las funcionalidades y recursos del sistema."
            ],
            [
                "id" => 2,
                "code" => 12,
                "name" => "Usuarios",
                "description" => "El módulo de usuarios gestiona el registro, la autenticación y la administración de usuarios dentro del sistema. Permite crear, editar y eliminar cuentas de usuario, así como definir roles y permisos asociados a cada usuario. Además, facilita funcionalidades como restablecimiento de contraseñas y gestión de perfiles de usuario."
            ],
            [
                "id" => 3,
                "code" => 13,
                "name" => "Distribución del Local",
                "description" => "El módulo de Distribución del Local se encarga de gestionar la disposición y asignación de espacios físicos dentro de un establecimiento o local. Permite organizar y administrar la distribución de áreas, salas o zonas, así como asignarlas a diferentes fines, como ventas, atención al cliente, almacenamiento, entre otros. Facilita la planificación y optimización del uso del espacio disponible para mejorar la eficiencia y comodidad en el lugar."
            ],
            [
                "id" => 4,
                "code" => 14,
                "name" => "Marcas",
                "description" => "El módulo de Marcas se encarga de gestionar y registrar las distintas marcas de productos o servicios dentro del sistema. Permite crear, editar y eliminar marcas, así como asociarlas a los productos correspondientes. Facilita la organización y categorización de los productos, brindando información importante para la identificación y diferenciación de las marcas presentes en el sistema."
            ],
            [
                "id" => 5,
                "code" => 15,
                "name" => "Categorías",
                "description" => "El módulo de Categorías se encarga de organizar y clasificar los productos o servicios dentro del sistema en distintas categorías o grupos. Permite crear, editar y eliminar categorías, así como asociarlas a los productos correspondientes. Facilita la navegación y búsqueda de productos, proporcionando una estructura jerárquica que ayuda a los usuarios a encontrar fácilmente lo que están buscando."
            ],
            [
                "id" => 6,
                "code" => 16,
                "name" => "Productos",
                "description" => "El módulo de Productos se encarga de gestionar y mantener un inventario de los productos disponibles en el sistema. Permite crear, editar y eliminar productos, así como definir atributos como nombre, descripción, precio y cantidad en stock. Facilita la administración eficiente del inventario y proporciona información detallada sobre cada producto, incluyendo su estado, categoría y otras características relevantes."
            ],
            [
                "id" => 7,
                "code" => 17,
                "name" => "Clientes",
                "description" => "El módulo de Clientes se encarga de gestionar la información relacionada con los clientes de la empresa u organización. Permite mantener un registro de los datos de contacto, historial de compras, preferencias, y otras informaciones relevantes de los clientes. Facilita la gestión de relaciones con los clientes, el seguimiento de las interacciones y la personalización de los servicios ofrecidos para satisfacer sus necesidades específicas."
            ],
            [
                "id" => 8,
                "code" => 18,
                "name" => "Ventas",
                "description" => "El módulo de Ventas se encarga de gestionar y registrar las transacciones de venta dentro del sistema. Permite a los usuarios crear y procesar órdenes de venta, registrar pagos, generar facturas y llevar un seguimiento del historial de ventas. Facilita el control y la administración eficiente del proceso de venta, desde la selección de productos hasta la emisión de documentos de venta y el seguimiento del estado de las transacciones."
            ],
            [
                "id" => 9,
                "code" => 19,
                "name" => "Gastos",
                "description" => "El módulo de Gastos se encarga de registrar y gestionar los gastos incurridos por la empresa u organización. Permite a los usuarios registrar de manera organizada y detallada los gastos relacionados con diversos aspectos, como compras de suministros, servicios, pagos de facturas, entre otros. Facilita el seguimiento y control de los gastos, así como la generación de informes financieros para análisis y toma de decisiones."
            ],
            [
                "id" => 10,
                "code" => 20,
                "name" => "Proveedores",
                "description" => "El módulo de Proveedores se encarga de gestionar la información relacionada con los proveedores con los que la empresa u organización realiza transacciones comerciales. Permite mantener un registro de los datos de contacto, historial de compras, términos de contrato y otras informaciones relevantes de los proveedores. Facilita la gestión de relaciones con los proveedores y la toma de decisiones en cuanto a la selección y negociación de acuerdos comerciales."
            ],
            [
                "id" => 11,
                "code" => 21,
                "name" => "Locales",
                "description" => "El módulo de Gestión de Locales proporciona una plataforma integral para administrar eficientemente los locales físicos de una empresa u organización. Permite a los usuarios registrar, editar y visualizar información detallada de cada local, incluyendo datos como dirección, horarios de apertura y contacto. Con funcionalidades de búsqueda y filtrado, facilita la localización rápida de locales específicos."
            ],
            [
                "id" => 12,
                "code" => 22,
                "name" => "Bajas",
                "description" => "El módulo de Bajas proporciona una funcionalidad para gestionar los productos que han sido retirados o eliminados del inventario de la empresa. Permite registrar las bajas de productos debido a pérdidas, daños u otros motivos, lo que resulta en una disminución del stock disponible."
            ]
        ];

        // DB::table('modules')->truncate();

        foreach ($data as $fact){
            Module::create($fact);
        }
    }
}
