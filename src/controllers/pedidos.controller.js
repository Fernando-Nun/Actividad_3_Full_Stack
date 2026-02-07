const { PedidosRepository } = require ('../repositories/pedidos.repository');

const repo = new PedidosRepository();

function getAll(req, res) {
    return res.json(repo.getAll());
}

function getById(req, res) {
    const id = Number(req.params.id)
    const pedido = repo.getById(id)

    if (!pedido) {
        return res.status(404).json({ error: 'Pedido no encontrado' })
    }

    return res.json(pedido)
}

function create(req, res) {
    const { producto, cantidad } = req.body;

    if (!producto && !cantidad) {
        return res.status(400).json({ error: 'Producto y cantidad son requeridos' })
    }

    if (typeof producto !== 'string' || producto.trim() === '') {
        return res.status(400).json({ error: 'Producto inválido' })
    }

    const cantidadNumber = Number(cantidad);
    if (cantidadNumber <= 0) {
        return res.status(400).json({ error: 'Cantidad invalida, debe ser un número mayor a 0' })
    }

    const newPedido = repo.create(producto, cantidadNumber);
    return res.status(201).json(newPedido);
}

function update(req, res) {
  const id = Number(req.params.id);
  const { producto, cantidad, estado } = req.body;
  const data = {};
  const pedido = repo.getById(id);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  if (pedido.estado !== 'pendiente') {
    return res.status(400).json({ error: 'No se puede modificar un pedido confirmado o cancelado' });
  }

  if (estado && !['pendiente', 'confirmado', 'cancelado'].includes(estado)) {
    return res.status(400).json({ error: 'Estado inválido' });
  }

  if (producto && typeof producto !== 'string') {
    return res.status(400).json({ error: 'Producto inválido' });
  }

  if (cantidad !== undefined) { 
    const cantidadNumber = Number(cantidad); 
    if (isNaN(cantidadNumber) || cantidadNumber <= 0) { 
      return res.status(400).json({ error: 'Cantidad inválida, debe ser un número mayor a 0' }); 
    } 
    data.cantidad = cantidadNumber; 
  }

  const actualizado = repo.update(id, { producto, cantidad: data.cantidad, estado });
  return res.json(actualizado);
}


function remove(req, res) {
  const id = Number(req.params.id);
  const pedido = repo.getById(id);

  if (!pedido) {
    return res.status(404).json({ error: 'Pedido no encontrado' });
  }

  if (pedido.estado !== 'pendiente') {
    return res.status(400).json({ error: 'Solo se pueden eliminar pedidos pendientes' });
  }

  repo.delete(id);
  return res.status(204).send();
}

module.exports = { getAll, getById, create, update, remove }