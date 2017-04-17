// Constructor
Vec3 = function( x, y, z )
{
    this.x = x.value;
    this.y = y.value;
    this.z = z.value;
}

// Add method
Vec3.prototype.add = function( v )
{
    this.x += v.x;
    this.y += v.y;
    this.z += v.z;
    return this;
}

// Sum method
Vec3.prototype.sum = function()
{
    return this.x + this.y + this.z;
}

// Min method
Vec3.prototype.min = function()
{
    if(this.x > this.y)
    {
        if(this.y > this.z)
        {
            return this.z;
        } else {
            return this.y;
        }
    } else {
        if(this.x > this.z)
        {
            return this.z;
        } else {
            return this.x;
        }
    }
}

// Max method
Vec3.prototype.max = function()
{
    if(this.x < this.y)
    {
        if(this.y < this.z)
        {
            return this.z;
        } else {
            return this.y;
        }
    } else {
        if(this.x < this.z)
        {
            return this.z;
        } else {
            return this.x;
        }
    }
}

// Mid method
Vec3.prototype.mid = function()
{
    if(this.x < this.y)
    {
        if(this.x < this.z && this.z < this.y)
        {
            return this.z;
        } else if (this.z < this.x) {
            return this.x;
        } else {
            return this.y;
        }
    } else if(this.y < this.x)
    {
        if(this.y < this.z && this.z < this.x)
        {
            return this.z;
        } else if (this.z < this.y) {
            return this.y;
        } else {
            return this.x;
        }
    }
}

// Area of Triangle Method
function AreaOfTriangle(v0, v1, v2)
{
    var temp1 = Math.pow(v1.x-v0.x, 2)+Math.pow(v1.y-v0.y, 2)+Math.pow(v1.z-v0.z, 2);
    var temp2 = Math.pow(v2.x-v0.x, 2)+Math.pow(v2.y-v0.y, 2)+Math.pow(v2.z-v0.z, 2);
    var temp3 = (v1.x-v0.x) * (v2.x-v0.x) + (v1.y-v0.y) * (v2.y-v0.y) + (v1.z-v0.z) * (v2.z-v0.z);
    var res = Math.sqrt(temp1*temp2-temp3*temp3)/2;
    return res;
}