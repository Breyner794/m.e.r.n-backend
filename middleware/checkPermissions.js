const checkPermission = (permissionType) => {
    return async (req, res, next) => {
      try {
        // Verifica si el usuario existe en la request (puesto por el middleware de auth)
        if (!req.user) {
          return res.status(401).json({ message: 'No autenticado' });
        }
  
        // Verifica si el usuario tiene un rol
        if (!req.user.role) {
          return res.status(403).json({ message: 'Rol no encontrado' });
        }
  
        // Verifica si el usuario tiene el permiso específico
        const hasPermission = req.user.role.permissions[permissionType];
        
        if (!hasPermission) {
          return res.status(403).json({ 
            message: `No tienes permiso para ${permissionType}` 
          });
        }
  
        next();
      } catch (error) {
        res.status(500).json({ message: 'Error al verificar permisos' });
      }
    };
  };
  
  const checkRoute = (route) => {
    return async (req, res, next) => {
      try {
        if (!req.user) {
          return res.status(401).json({ message: 'No autenticado' });
        }
  
        const userRole = req.user.role;
        
        // Si el rol tiene acceso a todas las rutas (*)
        if (userRole.allowedRoutes.includes('*')) {
          return next();
        }

        if (userRole.allowedRoutes.includes('/admin')) {
            return next();
        }
        
        // Verifica si la ruta actual está en las rutas permitidas
        const hasAccess = userRole.allowedRoutes.some(allowedRoute => {
          return req.path.startsWith(allowedRoute);
        });
  
        if (!hasAccess) {
          return res.status(403).json({ 
            message: 'No tienes acceso a esta ruta' 
          });
        }
  
        next();
      } catch (error) {
        res.status(500).json({ message: 'Error al verificar acceso a ruta' });
      }
    };
  };
  
module.exports = { checkPermission, checkRoute };