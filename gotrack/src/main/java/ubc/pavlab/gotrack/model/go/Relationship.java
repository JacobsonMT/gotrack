/*
 * The gotrack project
 * 
 * Copyright (c) 2015 University of British Columbia
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *       http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */

package ubc.pavlab.gotrack.model.go;

/**
 * Immutable representation of a relationship between two Gene Ontology Terms
 * 
 * @author mjacobson
 * @version $Id$
 */
public class Relationship {
    private final int childId;
    private final int parentId;
    private final RelationshipType type;

    public Relationship( int childId, int parentId, RelationshipType type ) {
        super();
        this.childId = childId;
        this.parentId = parentId;
        this.type = type;
    }

    public int getChildId() {
        return childId;
    }

    public Integer getParentId() {
        return parentId;
    }

    public RelationshipType getType() {
        return type;
    }

    @Override
    public String toString() {
        return "Relationship [childId=" + childId + ", parentId=" + parentId + ", type=" + type + "]";
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + childId;
        result = prime * result + parentId;
        result = prime * result + ( ( type == null ) ? 0 : type.hashCode() );
        return result;
    }

    @Override
    public boolean equals( Object obj ) {
        if ( this == obj ) return true;
        if ( obj == null ) return false;
        if ( getClass() != obj.getClass() ) return false;
        Relationship other = ( Relationship ) obj;
        if ( childId != other.childId ) return false;
        if ( parentId != other.parentId ) return false;
        if ( type != other.type ) return false;
        return true;
    }

}