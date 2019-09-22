using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using vega.Models;

namespace vega.Extensions
{
    public static class IQueryableExtensions
    {
        public static IQueryable<T> ApplyOrdering<T>(this IQueryable<T> query, 
            IQueryObject queryObject, Dictionary<string, Expression<Func<T, object>>> columnsMap)
        {
            if (!string.IsNullOrEmpty(queryObject.SortBy) && columnsMap.ContainsKey(queryObject.SortBy)) {
                if (queryObject.IsSortAscending)
                    return query.OrderBy(columnsMap[queryObject.SortBy]);
                else
                    return query.OrderByDescending(columnsMap[queryObject.SortBy]);
            }
            else
                return query;
        }
    }
}